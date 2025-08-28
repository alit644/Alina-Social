import notify from "@/helper/notify";
import { useCommentStore } from "@/store/useComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddComment = (postID: string, data: { content: string }) => {
  const { addComment } = useCommentStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["comments"],
    mutationFn: async () => {
      await addComment(postID, {
        content: data.content,
      });
    },
    onSuccess: () => {
      notify("success", "Comment Successfully Added");
      queryClient.invalidateQueries({ queryKey: ["comments", postID] });
    },
    onError: () => {
      notify("error", "Error Add Comment");
    },
  });
};
export default useAddComment;
