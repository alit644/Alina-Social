/* eslint-disable @typescript-eslint/no-explicit-any */
import notify from "@/helper/notify";
import type { IComment } from "@/interfaces";
import supabase from "@/supabase";
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
        notify("error", `${commentError?.message || "Something went wrong"}`);
        throw commentError;
      }
      set({ isLoading: false, error: null });
      notify("success", "Comment Successfully Added");
    } catch (error) {
      console.log(error);
      notify("error", "Something went wrong");
    }
  },
  getComments: async (postID: string) => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*, profiles (id,avatar_url, full_name, username)")
        .eq("post_id", postID);
      if (error) throw error;
      return data;
    } catch (error: any) {
      notify("error", error?.message || "Something went wrong");
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
        notify("error", deleteErr?.message || "Something went wrong");
        set({ isLoading: false, error: "Error Delete Comment" });
        throw deleteErr;
      }
      set({ isLoading: false, error: null });
      notify("success", "Comment Successfully Deleted");
    } catch (error:any) {
      notify("error", error?.message || "Something went wrong");
    }
  },
}));
