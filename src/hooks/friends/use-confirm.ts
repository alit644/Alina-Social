import { useFriendsStore } from "@/store/useFriends";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useConfirmRequest = () => {
  const { confirmRequest } = useFriendsStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId: string) => await confirmRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", "friends", "incoming-requests"],
        exact: true,
      });

      queryClient.invalidateQueries({
        queryKey: ["profile", "profileStats"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", "friends"],
        exact: true,
      });
    },
  });
};
export default useConfirmRequest;
