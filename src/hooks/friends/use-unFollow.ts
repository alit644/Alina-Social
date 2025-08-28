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
      });

      queryClient.invalidateQueries({
        queryKey: ["profile", "profileStats",friend_request_id],
        exact: true,
      });
    },
  });
};
export default useUnFollow;
