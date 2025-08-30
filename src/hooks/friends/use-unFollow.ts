import { useFriendsStore } from "@/store/useFriends";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUnFollow = (friend_request_id: string) => {
  const { unFollow } = useFriendsStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await unFollow(friend_request_id),
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
export default useUnFollow;
