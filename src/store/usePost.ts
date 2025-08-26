/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IPost } from "@/interfaces";
import { create } from "zustand";
import { useAuthStore } from "./Auth/useAuthStore";
import supabase from "@/supabase";
import notify from "@/helper/notify";
import getUserId from "@/helper/getUserId";
interface IUsePost {
  posts: IPost[] | undefined | null;
  isLoading: boolean;
  error: string | null;
  createPost: (data: {
    content: string;
    image_url?: string | File;
  }) => Promise<{ content: string; image_url?: string | File } | undefined>;
  getUserPosts: () => Promise<IPost[] | undefined>;
  getAllPosts: (
    page: number,
    pageSize: number
  ) => Promise<{ data: IPost[]; nextPage: number | undefined, currentPage: number } | undefined>;
  deletePost: (postID: string) => Promise<void>;
  getOnePost: (postID: string) => Promise<IPost[] | undefined>;
  updatePost: (
    postID: string,
    data: { content: string; image_url?: string | File | null }
  ) => Promise<IPost | undefined>;
  getUserPostById: (userID: string) => Promise<IPost[] | undefined>;
}
export const usePostStore = create<IUsePost>((set) => ({
  posts: [] as IPost[],
  isLoading: false,
  error: null,
  createPost: async (data) => {
    set({ isLoading: true, error: null });
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

      const { data: postData, error } = await supabase
        .from("posts")
        .insert({
          content: data.content,
          image_url: publicUrl,
          user_id: useAuthStore.getState().user?.id,
        })
        .single();
      if (error) {
        set({ error: "Error Create Post", isLoading: false });
        notify("error", error?.message || "Something went wrong");
        throw error;
      }

      set({ posts: [postData], isLoading: false, error: null });

      notify("success", "Post Successfully Created");
      return data;
    } catch (error: any) {
      console.log(error);
      set({ error: error as string, isLoading: false });
      notify("error", "Error Create Post");
    }
  },
  // get user posts (My Posts)
  getUserPosts: async () => {
    try {
     const userID = await getUserId()
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", userID)
        .limit(10)
        .order("created_at", { ascending: false });
      if (error) {
        notify("error", error?.message || "Error Get User Posts");
        throw error;
      }
      return data;
    } catch (error) {
      console.log(error)
      notify("error", "Error Get User Posts");
    }
  },
  getAllPosts: async (page = 1, pageSize = 4) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1; // Adjusted to be inclusive
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*, profiles!fk_user (avatar_url, full_name, username)")
        .order("created_at", { ascending: false })
        .range(start, end);
      if (error) {
        set({ error: "Error Get All Posts", isLoading: false });
        notify("error", error?.message || "Error Get All Posts");
        throw error;
      }
      set({ posts: data, isLoading: false, error: null });
      return {
        data,
        nextPage: data.length === pageSize ? page + 1 : undefined,
        currentPage: page,
      };
    } catch (error) {
      set({ error: error as string, isLoading: false });
      notify("error", "Error Get All Posts");
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
  getUserPostById: async (postID: string) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", postID)
        .limit(10)
        .order("created_at", { ascending: false });
      if (error) {
        notify("error", error?.message || "Error Get User Posts");
        throw error;
      }
      return data;
    } catch (error) {
      console.log(error);
      notify("error", "Error Get User Posts");
    }
  },
}));
