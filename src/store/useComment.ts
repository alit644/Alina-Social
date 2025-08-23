/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IComment } from "@/interfaces";
import supabase from "@/supabase";
import { toast } from "sonner";
import { create } from "zustand";

interface ICommentStore {
  isLoading: boolean;
  error: string | null;

  addComment: (postID: string, data: { content: string }) => Promise<void>;
  getComments: (postID: string) => Promise<IComment[]>;
  deleteComment: (commentID: string) => Promise<void>;
}
export const useCommentStore = create<ICommentStore>((set) => ({
  isLoading: false,
  error: null,
  addComment: async (postID: string, data: { content: string }) => {
    set({ isLoading: true, error: null });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { error: commentError } = await supabase.from("comments").insert({
        post_id: postID,
        user_id: user.id,
        content: data.content,
      });
      if (commentError) {
        set({ error: "Error Add Comment", isLoading: false });
        toast.error("Error Add Comment", {
          style: {
            background: "var(--danger-300)",
            border: "1px solid var(--danger-500)",
            color: "#fff",
          },
          description: "Something went wrong",
          duration: 5000,
        });
        throw commentError;
      }
      set({ isLoading: false, error: null });
      toast.success("Comment Successfully Added", {
        style: {
          background: "var(--success-300)",
          border: "1px solid var(--success-500)",
          color: "#fff",
        },
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error Add Comment", {
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
  getComments: async (postID: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*, profiles (id,avatar_url, full_name, username)")
        .eq("post_id", postID);
      if (error) throw error;
      set({ isLoading: false, error: null });
      return data;
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Something went wrong", {
        style: {
          background: "var(--danger-300)",
          border: "1px solid var(--danger-500)",
          color: "#fff",
        },
        description: "Something went wrong",
        duration: 5000,
      });
      return [];
    }
  },
  deleteComment: async (commentID: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error: deleteErr } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentID);
      if (deleteErr) {
        toast.error("Error Delete Comment", {
          style: {
            background: "var(--danger-300)",
            border: "1px solid var(--danger-500)",
            color: "#fff",
          },
          description: "Something went wrong",
          duration: 5000,
        });
        set({ isLoading: false, error: "Error Delete Comment" });
        throw deleteErr;
      }
      set({ isLoading: false, error: null });
      toast.success("Comment Successfully Deleted", {
        style: {
          background: "var(--success-300)",
          border: "1px solid var(--success-500)",
          color: "#fff",
        },
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error Delete Comment", {
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
