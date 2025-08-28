import { useFriendsStore } from "@/store/useFriends";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCancelRequest = () => {
 const { cancelRequest } =useFriendsStore()
 const queryClient = useQueryClient()
 return useMutation({
    mutationFn: async (requestId: string) => {
      await cancelRequest(requestId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", "friends", "outgoing-requests"],
      });
    },
  });
}
export default useCancelRequest