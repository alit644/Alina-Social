/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/supabase";
import getUserId from "@/helper/getUserId";
type ToggleLikeParams = {
  postID: string;
  wasLiked: boolean;
};

export function useToggleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postID, wasLiked }: ToggleLikeParams) => {
      const userID = await getUserId();
      if (!userID) throw new Error("Not authenticated");

      if (wasLiked) {
        const { error } = await supabase
          .from("likes")
          .delete()
          .match({ post_id: postID, user_id: userID });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("likes")
          .insert({ post_id: postID, user_id: userID });
        if (error) throw error;
      }
    },

    // onMutate: async ({ postID }) => {
    //   await queryClient.cancelQueries({ queryKey: ["posts"], exact: false });

    //   const previousData = queryClient.getQueryData(["posts" , "all-posts"]);

    //   queryClient.setQueryData(["posts" , "all-posts"], (old: any) => {
    //     if (!old) return old;

    //     return {
    //       ...old,
    //       pages: old.pages.map((page: any) => ({
    //         ...page,
    //         data: page.data.map((post: any) => {
    //           if (post.id !== postID) return post;
    //           const wasLiked = post.is_liked;
    //           return {
    //             ...post,
    //             is_liked: !wasLiked,
    //             likes_count: wasLiked
    //               ? post.likes_count - 1
    //               : post.likes_count + 1,
    //           };
    //         }),
    //       })),
    //     };
    //   });

    //   return { previousData };
    // },

    onMutate: async ({ postID }) => {
     await queryClient.cancelQueries({ queryKey: ["posts"], exact: false });

     // جميع الكاشات المتعلقة بالـ posts
     const queries = queryClient.getQueriesData({ queryKey: ["posts"] });

     // نرجع الـ state القديم للاستخدام في onError
     const previousStates = queries.map(([key, data]) => ({
       key,
       data,
     }));

     queries.forEach(([key]) => {
       queryClient.setQueryData(key, (old: any) => {
         if (!old) return old;

         return {
           ...old,
           pages: old.pages.map((page: any) => ({
             ...page,
             data: page.data.map((post: any) => {
               if (post.id !== postID) return post;
               const wasLiked = post.is_liked;
               return {
                 ...post,
                 is_liked: !wasLiked,
                 likes_count: wasLiked
                   ? post.likes_count - 1
                   : post.likes_count + 1,
               };
             }),
           })),
         };
       });
     });

     return { previousStates };
   },

    onError: (_err, _vars, context) => {
      if (context?.previousStates) {
        context.previousStates.forEach(({ key, data }) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
    //  onSettled: async () => {
    //   const queries = queryClient.getQueriesData({ queryKey: ["posts"] });

    //   queries.forEach(([key]) => {
    //     queryClient.invalidateQueries({
    //       queryKey: key,
    //       refetchType: "active",

    //     });
    //   });
    // }
  });
}
