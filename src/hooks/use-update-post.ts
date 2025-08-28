import { useMutation } from "@tanstack/react-query";
import { usePostStore } from "@/store/usePost";
import { useQueryClient } from "@tanstack/react-query";
import notify from "@/helper/notify";

const useUpdatePost = (postID: string) => {
  const { updatePost } = usePostStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      postContent: string;
      postImage?: File | string | null;
    }) => {
      await updatePost(postID || "", {
        content: data.postContent || "",
        image_url: data.postImage,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "my-posts"] });
    },
    onError: (error) => {
      notify("error", error?.message || "Error Update Post");
      throw error;
    },
  });
};
export default useUpdatePost;
