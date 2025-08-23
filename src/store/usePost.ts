/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IPost } from "@/interfaces";
import { create } from "zustand";
import { useAuthStore } from "./Auth/useAuthStore";
import supabase from "@/supabase";
import { toast } from "sonner";
interface IUsePost {
  posts: IPost[] | undefined | null;
  isLoading: boolean;
  error: string | null;
  createPost: (data: {
    content: string;
    image_url?: string | File;
  }) => Promise<{ content: string; image_url?: string | File } | undefined>;
  getUserPosts: () => Promise<IPost[] | undefined>;
  getAllPosts: () => Promise<IPost[] | undefined>;
  deletePost: (postID: string) => Promise<void>;
  getOnePost: (postID: string) => Promise<IPost[] | undefined>;
  updatePost: (
    postID: string,
    data: { content: string; image_url?: string | File | null }
  ) => Promise<IPost | undefined>;
}
export const usePostStore = create<IUsePost>((set) => ({
  posts: [] as IPost[],
  isLoading: false,
  error: null,
  //Create Post
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
          toast.error("Error Create Post", {
            style: {
              background: "var(--danger-300)",
              border: "1px solid var(--danger-500)",
              color: "#fff",
            },
            description: uploadError?.message || "Something went wrong",
            duration: 5000,
          });
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
        toast.error("Error Create Post", {
          style: {
            background: "var(--danger-300)",
            border: "1px solid var(--danger-500)",
            color: "#fff",
          },
          description: error?.message || "Something went wrong",
          duration: 5000,
        });
        throw error;
      }

      set({ posts: [postData], isLoading: false, error: null });
      toast.success("Post Successfully Created", {
        style: {
          background: "var(--success-300)",
          border: "1px solid var(--success-500)",
          color: "#fff",
        },
        duration: 5000,
      });
      return data;
    } catch (error: any) {
      console.log(error);
      set({ error: error as string, isLoading: false });
      toast.error("Error Create Post", {
        style: {
          background: "var(--danger-300)",
          border: "1px solid var(--danger-500)",
          color: "#fff",
        },
        description: "Something went wrong",
        duration: 5000,
      });
    }
  },
  getUserPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", useAuthStore.getState().user?.id)
        .limit(10)
        .order("created_at", { ascending: false });
      if (error) {
        set({ error: "Error Get User Posts", isLoading: false });
        toast.error("Error Get User Posts", {
          style: {
            background: "var(--danger-300)",
            border: "1px solid var(--danger-500)",
            color: "#fff",
          },
          description: "Something went wrong",
          duration: 5000,
        });
        throw error;
      }
      set({ posts: data, isLoading: false, error: null });
      return data;
    } catch (error) {
      set({ error: error as string, isLoading: false });
      toast.error("Error Get User Posts", {
        style: {
          background: "var(--danger-300)",
          border: "1px solid var(--danger-500)",
          color: "#fff",
        },
        description: "Something went wrong",
        duration: 5000,
      });
    }
  },
  getAllPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*, profiles!fk_user (avatar_url, full_name, username)")
        .limit(10)
        .order("created_at", { ascending: false });
      if (error) {
        set({ error: "Error Get All Posts", isLoading: false });
        toast.error("Error Get All Posts", {
          style: {
            background: "var(--danger-300)",
            border: "1px solid var(--danger-500)",
            color: "#fff",
          },
          description: "Something went wrong",
          duration: 5000,
        });
        throw error;
      }
      set({ posts: data, isLoading: false, error: null });
      return data;
    } catch (error) {
      set({ error: error as string, isLoading: false });
      toast.error("Error Get User Posts", {
        style: {
          background: "var(--danger-300)",
          border: "1px solid var(--danger-500)",
          color: "#fff",
        },
        description: "Something went wrong",
        duration: 5000,
      });
    }
  },
  deletePost: async (postID: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", postID);
      if (deleteError) {
        set({ error: "Error Delete Post", isLoading: false });
        toast.error("Error Delete Post", {
          style: {
            background: "var(--danger-300)",
            border: "1px solid var(--danger-500)",
            color: "#fff",
          },
          description: "Something went wrong",
          duration: 5000,
        });
        throw deleteError;
      }
      set({ isLoading: false, error: null });
      toast.success("Post Successfully Deleted", {
        style: {
          background: "var(--success-300)",
          border: "1px solid var(--success-500)",
          color: "#fff",
        },
        duration: 5000,
      });
    } catch (error) {
      console.log(error);
      set({ error: error as string, isLoading: false });
      toast.error("Error Delete Post", {
        style: {
          background: "var(--danger-300)",
          border: "1px solid var(--danger-500)",
          color: "#fff",
        },
        description: "Something went wrong",
        duration: 5000,
      });
    }
  },
  getOnePost: async (postID: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data: onePostData, error: getError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postID)
        .maybeSingle();
      if (getError) {
        set({ error: "Error Get One Post", isLoading: false });
        toast.error("Error Get One Post", {
          style: {
            background: "var(--danger-300)",
            border: "1px solid var(--danger-500)",
            color: "#fff",
          },
          description: "Something went wrong",
          duration: 5000,
        });
        throw getError;
      }
      set({ posts: [onePostData], isLoading: false, error: null });
      return [onePostData];
    } catch (error) {
      console.log(error);
      toast.error("Error Get One Post", {
        style: {
          background: "var(--danger-300)",
          border: "1px solid var(--danger-500)",
          color: "#fff",
        },
        description: "Something went wrong",
        duration: 5000,
      });
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
          toast.error("Error Create Post", {
            style: {
              background: "var(--danger-300)",
              border: "1px solid var(--danger-500)",
              color: "#fff",
            },
            description: uploadError?.message || "Something went wrong",
            duration: 5000,
          });
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
        toast.error("Error Update Post", {
          style: {
            background: "var(--danger-300)",
            border: "1px solid var(--danger-500)",
            color: "#fff",
          },
          description: "Something went wrong",
          duration: 5000,
        });
        throw updateError;
      }
      toast.success("Post Successfully Updated", {
        style: {
          background: "var(--success-300)",
          border: "1px solid var(--success-500)",
          color: "#fff",
        },
        duration: 3000,
      });
      set({ posts: updateData, isLoading: false, error: null });

      return updateData || null;
    } catch (error: any) {
      console.log(error);
      set({ error: error as string, isLoading: false });
      toast.error("Error Update Post", {
        style: {
          background: "var(--danger-300)",
          border: "1px solid var(--danger-500)",
          color: "#fff",
        },
        description: "Something went wrong",
        duration: 5000,
      });
    }
  },
}));
