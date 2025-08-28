import { useFriendsStore } from "@/store/useFriends";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRejectRequest = () => {
  const { rejectRequest } = useFriendsStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId: string) => {
      await rejectRequest(requestId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", "friends", "incoming-requests"],
      });
    },
  });
};
export default useRejectRequest;
