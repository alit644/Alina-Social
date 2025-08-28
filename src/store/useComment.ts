/* eslint-disable @typescript-eslint/no-explicit-any */
import notify from "@/helper/notify";
import type { IComment } from "@/interfaces";
import supabase from "@/supabase";
import { create } from "zustand";

interface ICommentStore {
  isLoading: boolean;
  error: string | null;

  addComment: (postID: string, data: { content: string }) => Promise<void>;
  getComments: (
    postID: string,
    page?: number,
    pageSize?: number
  ) => Promise<{
    data: IComment[];
    nextPage: number | undefined;
    currentPage: number;
  }>;
  deleteComment: (commentID: string) => Promise<void>;
}
export const useCommentStore = create<ICommentStore>(() => ({
  isLoading: false,
  error: null,
  addComment: async (postID: string, data: { content: string }) => {
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
        notify("error", `${commentError?.message || "Something went wrong"}`);
        throw commentError;
      }
      notify("success", "Comment Successfully Added");
    } catch (error: any) {
      notify("error", error?.message || "Something went wrong");
      throw error;
    }
  },
  getComments: async (postID: string, page = 1, pageSize = 4) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*, profiles (id,avatar_url, full_name, username)")
        .eq("post_id", postID)
        .order("created_at", { ascending: false })
        .range(start, end);
      if (error) throw error;
      return {
        data,
        nextPage: data.length === pageSize ? page + 1 : undefined,
        currentPage: page,
      };
    } catch (error: any) {
      notify("error", error?.message || "Something went wrong");
      return {
        data: [],
        nextPage: undefined,
        currentPage: page,
      };
    }
  },
  deleteComment: async (commentID: string) => {
    try {
      const { error: deleteErr } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentID);
      if (deleteErr) {
        notify("error", deleteErr?.message || "Something went wrong");
        throw deleteErr;
      }
      notify("success", "Comment Successfully Deleted");
    } catch (error: any) {
      notify("error", error?.message || "Something went wrong");
    }
  },
}));
