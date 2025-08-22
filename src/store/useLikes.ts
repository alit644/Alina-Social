import supabase from "@/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { toast } from "sonner";
import { create } from "zustand";
interface ILikeStore {
  likes: {
    [postID: string]: {
      isLiked: boolean;
      count: number;
    };
  };
  resetLikes: () => void;
  fetchLikes: (postID: string) => Promise<void>;
  toggleLike: (postID: string, userID: string) => Promise<void>;
  subscribeToLikes: (postID: string) => RealtimeChannel;
}
export const useLikeStore = create<ILikeStore>((set, get) => ({
  likes: {},
  resetLikes: () => set({ likes: {} }),
  // Fetch likes
  fetchLikes: async (postID: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // هل المستخدم الحالي عامل لايك؟
      const { data: userLike } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", postID)
        .eq("user_id", user.id)
        .maybeSingle();

      // كم عدد اللايكات على البوست؟
      const { data: post } = await supabase
        .from("posts")
        .select("likes_count")
        .eq("id", postID)
        .single();

      set((state) => ({
        likes: {
          ...state.likes,
          [postID]: {
            isLiked: !!userLike,
            count: post?.likes_count || 0,
          },
        },
      }));
    } catch (error) {
      console.log("error fetchLikes", error);
    }
  },
  toggleLike: async (postID: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const current = get().likes[postID] || { isLiked: false, count: 0 };

    try {
      if (current.isLiked) {
        // حذف لايك المستخدم الحالي فقط
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("post_id", postID)
          .eq("user_id", user.id);

        if (error) throw error;


        set((state) => ({
          likes: {
            ...state.likes,
            [postID]: {
              isLiked: false,
              count: Math.max(0, current.count - 1),
            },
          },
        }));
      } else {
        // إضافة لايك للمستخدم الحالي
        const { error } = await supabase.from("likes").insert({
          post_id: postID,
          user_id: user.id,
        });

        if (error) throw error;


        set((state) => ({
          likes: {
            ...state.likes,
            [postID]: {
              isLiked: true,
              count: current.count + 1,
            },
          },
        }));
      }
    } catch (error) {
      console.log("error toggleLike", error);
      toast.error("Something went wrong");
    }
  },

  subscribeToLikes: (postID: string) => {
    const channel = supabase.channel(`posts-changes-${postID}`);
    channel.on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "posts",
        filter: `id=eq.${postID}`,
      },
      (payload) => {
        console.log("Change received:", payload);
        const newLIkes = payload.new.likes_count;
        set((state) => ({
          likes: {
            ...state.likes,
            [postID]: {
              isLiked: state.likes[postID]?.isLiked,
              count: newLIkes,
            },
          },
        }));
      }
    ).subscribe();

    return channel;
  },
}));
