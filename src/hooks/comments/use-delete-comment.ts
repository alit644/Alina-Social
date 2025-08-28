import { useMutation } from "@tanstack/react-query";
import { useCommentStore } from "@/store/useComment";
import { useQueryClient } from "@tanstack/react-query";

const useDeleteComment = () => {
  const { deleteComment } = useCommentStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (commentID: string) => {
      await deleteComment(commentID);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
export default useDeleteComment;
