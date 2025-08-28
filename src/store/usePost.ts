/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IPost } from "@/interfaces";
import { create } from "zustand";
import { useAuthStore } from "./Auth/useAuthStore";
import supabase from "@/supabase";
import notify from "@/helper/notify";
import getUserId from "@/helper/getUserId";
import type { RealtimeChannel } from "@supabase/supabase-js";
interface IUsePost {
  posts: IPost[] | undefined | null;
  isLoading: boolean;
  error: string | null;
  likes: {
    [postID: string]: {
      posts?: IPost[];
      isLiked: boolean;
      count: number;
    };
  };
  createPost: (data: {
    content: string;
    image_url?: string | File;
  }) => Promise<{ content: string; image_url?: string | File } | undefined>;
  getUserPosts: (
    page?: number,
    pageSize?: number
  ) => Promise<
    | { data: IPost[]; nextPage: number | undefined; currentPage: number }
    | undefined
  >;
  getAllPostsRPC: (
    page?: number,
    pageSize?: number
  ) => Promise<
    | { data: IPost[]; nextPage: number | undefined; currentPage: number }
    | undefined
  >;
  deletePost: (postID: string) => Promise<void>;
  getOnePost: (postID: string) => Promise<IPost[] | undefined>;
  updatePost: (
    postID: string,
    data: { content: string; image_url?: string | File | null }
  ) => Promise<IPost | undefined>;
  getUserPostById: (
    userID: string,
    page?: number,
    pageSize?: number
  ) => Promise<{
    data: IPost[];
    nextPage: number | undefined;
    currentPage: number;
  }>;
  resetLikes: () => void;
  subscribeToLikes: () => RealtimeChannel;
}
export const usePostStore = create<IUsePost>((set) => ({
  posts: [] as IPost[],
  isLoading: false,
  error: null,
  likes: {},
  resetLikes: () => set({ likes: {} }),
  createPost: async (data) => {
    try {
      let publicUrl = data.image_url;
      if (data.image_url instanceof File) {
        const fileName = `${useAuthStore.getState().user?.id}/${Date.now()}_${
          data.image_url.name
        }`;
        const { error: uploadError } = await supabase.storage
          .from("post-image")
          .upload(fileName, data.image_url, {
            upsert: true,
          });
        if (uploadError) {
          set({ error: "Error Create Post", isLoading: false });
          notify("error", uploadError?.message || "Something went wrong");
          throw uploadError;
        }
        const { data: publicUrlData } = supabase.storage
          .from("post-image")
          .getPublicUrl(fileName);
        publicUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase
        .from("posts")
        .insert({
          content: data.content,
          image_url: publicUrl,
          user_id: useAuthStore.getState().user?.id,
        })
        .single();
      if (error) {
        notify("error", error?.message || "Something went wrong");
        throw error;
      }

      notify("success", "Post Successfully Created");
      return data;
    } catch (error: any) {
      console.log(error);
      notify("error", "Error Create Post");
    }
  },
  // get user posts (My Posts)
  getUserPosts: async (page = 1, pageSize = 4) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    try {
      const userID = await getUserId();
      const { data, error } = await supabase
        .rpc("get_posts_with_details", {
          user_uuid: userID,
          my_posts_only: true,
        })
        .range(start, end);
      if (error) {
        notify("error", error?.message || "Error Get User Posts");
        throw error;
      }
      if (data && Array.isArray(data)) {
        return {
          data,
          nextPage: data.length === pageSize ? page + 1 : undefined,
          currentPage: page,
        };
      }
    } catch (error: any) {
      notify("error", error?.message || "Error Get User Posts");
      throw error;
    }
  },
  getAllPostsRPC: async (page = 1, pageSize = 4) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    try {
      const userID = await getUserId();
      if (!userID) return;
      const { data, error } = await supabase
        .rpc("get_posts_with_details", {
          user_uuid: userID,
          my_posts_only: false,
        })
        .range(start, end);
      if (error) {
        notify("error", error?.message || "Error Fetching Posts");
        return undefined;
      }
      if (data && Array.isArray(data)) {
        return {
          data,
          nextPage: data.length === pageSize ? page + 1 : undefined,
          currentPage: page,
        };
      }
    } catch (error: any) {
      console.log(error);
      notify("error", "Error Fetching Posts");
    }
  },
  deletePost: async (postID: string) => {
    try {
      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", postID);
      if (deleteError) {
        notify("error", deleteError?.message || "Error Delete Post");
        throw deleteError;
      }
      notify("success", "Post Successfully Deleted");
    } catch (error) {
      console.log(error);
      notify("error", "Error Delete Post");
    }
  },
  getOnePost: async (postID: string) => {
    try {
      const { data: onePostData, error: getError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postID)
        .maybeSingle();
      if (getError) {
        notify("error", getError?.message || "Error Get One Post");
        throw getError;
      }
      return [onePostData];
    } catch (error) {
      console.log(error);
      notify("error", "Error Get One Post");
    }
  },
  updatePost: async (
    postID: string,
    data: { content: string; image_url?: string | File | null }
  ) => {
    set({ isLoading: true, error: null });
    try {
      if (data.image_url instanceof File) {
        const fileName = `${useAuthStore.getState().user?.id}/${Date.now()}_${
          data.image_url.name
        }`;
        const { error: uploadError } = await supabase.storage
          .from("post-image")
          .upload(fileName, data.image_url, {
            upsert: true,
          });
        if (uploadError) {
          set({ error: "Error Create Post", isLoading: false });
          notify("error", uploadError?.message || "Error Create Post");
          throw uploadError;
        }
        const { data: publicUrlData } = supabase.storage
          .from("post-image")
          .getPublicUrl(fileName);
        data.image_url = publicUrlData.publicUrl;
      }

      const { data: updateData, error: updateError } = await supabase
        .from("posts")
        .update({
          content: data.content,
          image_url: data.image_url,
        })
        .eq("id", postID)
        .select("*")
        .single();
      if (updateError) {
        set({ error: "Error Update Post", isLoading: false });
        notify("error", updateError?.message || "Error Update Post");
        throw updateError;
      }
      notify("success", "Post Successfully Updated");
      set({ posts: updateData, isLoading: false, error: null });

      return updateData || null;
    } catch (error: any) {
      console.log(error);
      set({ error: error as string, isLoading: false });
      notify("error", "Error Update Post");
    }
  },
  getUserPostById: async (postID: string, page = 1, pageSize = 4) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    try {
      const userID = await getUserId();
      const { data, error } = await supabase
        .rpc("get_posts_with_details", {
          user_uuid: userID,
          target_user_id: postID,
        })
        .range(start, end);
      if (error) {
        notify("error", error?.message || "Error Get User Posts");
        throw error;
      }
      
      return {
        data: Array.isArray(data) ? data : [],
        nextPage: Array.isArray(data) && data.length === pageSize ? page + 1 : undefined,
        currentPage: page,
      };
    } catch {
      notify("error", "Error Get User Posts");
      return {
        data: [],
        nextPage: undefined,
        currentPage: page,
      };
    }
  },
  subscribeToLikes: () => {
    const channel = supabase
      .channel("likes-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "likes",
        },
        async (payload) => {
          console.log("payload", payload);
          const { post_id, user_id } =
            (payload.new as { post_id?: string; user_id?: string }) ||
            (payload.old as { post_id?: string; user_id?: string });

          set((state) => {
            const updatedPosts = (state.posts ?? []).map((post) => {
              if (post.id === post_id) {
                let newCount =
                  typeof post.likes_count === "number" ? post.likes_count : 0;
                let newIsLiked = post.is_liked;

                if (payload.eventType === "INSERT") {
                  newCount++;
                  if (user_id === useAuthStore.getState().user?.id)
                    newIsLiked = true;
                } else if (payload.eventType === "DELETE") {
                  newCount--;
                  if (user_id === useAuthStore.getState().user?.id)
                    newIsLiked = false;
                }

                return {
                  ...post,
                  likes_count: newCount,
                  is_liked: newIsLiked,
                };
              }
              return post;
            });
            return { posts: updatedPosts };
          });
        }
      )
      .subscribe();

    return channel;
  },
  
}));
