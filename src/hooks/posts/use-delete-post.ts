import { useMutation } from "@tanstack/react-query";
import { usePostStore } from "@/store/usePost";
import notify from "@/helper/notify";
import { useQueryClient } from "@tanstack/react-query";
const useDeletePost = (postID: string) => {
 const { deletePost } = usePostStore();
 const queryClient = useQueryClient();
 return useMutation({
  mutationFn: async () => await deletePost(postID),
  onSuccess: () => {
   notify("success", "Post Successfully Deleted");
   queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
  onError: () => {
   notify("error", "Error Delete Post");
  },
  
 })
}
export default useDeletePost;
