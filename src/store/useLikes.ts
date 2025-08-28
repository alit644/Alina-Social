/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import type { IPost } from "@/interfaces";
interface ILikeStore {
  likes: {
    [postID: string]: {
      posts?: IPost[];
      isLiked: boolean;
      count: number;
    };
  };
  error: string | null;
  resetLikes: () => void;
  // toggleLike: (postID: string, userID: string) => Promise<void>;
  // subscribeToLikes: () => RealtimeChannel;
}
export const useLikeStore = create<ILikeStore>((set) => ({
  likes: {},
  error: null,
  resetLikes: () => set({ likes: {}, error: null }),
  // toggleLike: async (postID: string) => {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();

  //   const post = usePostStore
  //     .getState()
  //     .posts?.find((item) => item.id === postID);
  //   if (!user || !post) return;

  //   // جلب الحالة الحالية
  //   const current = get().likes[postID] || {
  //     isLiked: post.is_liked,
  //     count: post.likes_count,
  //   };

  //   // Optimistic UI: تحديث الحالة مباشرة
  //   set((state) => ({
  //     likes: {
  //       ...state.likes,
  //       [postID]: {
  //         ...current,
  //         isLiked: !current.isLiked,
  //         count: current.isLiked ? current.count - 1 : current.count + 1,
  //         isLoading: true,
  //       },
  //     },
  //   }));

  //   try {
  //     if (current.isLiked) {
  //       // حذف لايك
  //       const { error } = await supabase.from("likes").delete().match({
  //         post_id: postID,
  //         user_id: user.id,
  //       });

  //       if (error) throw error;
  //     } else {
  //       // إضافة لايك
  //       const { error } = await supabase.from("likes").insert({
  //         post_id: postID,
  //         user_id: user.id,
  //       });

  //       if (error) throw error;
  //     }

  //     // بعد نجاح العملية، إزالة isLoading
  //     set((state) => ({
  //       likes: {
  //         ...state.likes,
  //         [postID]: {
  //           ...state.likes[postID],
  //           isLoading: false,
  //         },
  //       },
  //     }));
  //   } catch (error: any) {
  //     console.log("error toggleLike", error);
  //     set((state) => ({
  //       likes: {
  //         ...state.likes,
  //         [postID]: { ...current, isLoading: false },
  //       },
  //       error: error?.message || "Something went wrong",
  //     }));
  //     notify("error", error?.message || "Something went wrong");
  //   }
  // },
  
}));
