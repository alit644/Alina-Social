/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { usePostStore } from "../../store/usePost";
import { useQueryClient } from "@tanstack/react-query";
import notify from "@/helper/notify";

const useCreatePost = (form: any) => {
  const { createPost } = usePostStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-post"],
    mutationFn: async (data: { content: string; image_url?: string | File }) =>
      await createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      form.reset();
    },
    onError: (error: any) => {
      const message = error?.message || "Error Create Post";
      notify("error", message);
    },
  });
};
export default useCreatePost;
