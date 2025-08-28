import { useFriendsStore } from "@/store/useFriends";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddFriend = (receiver_id: string) => {
  const { addFriend } = useFriendsStore();
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["profile", "friends", "add-friend", receiver_id],
    mutationFn: () => addFriend(receiver_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", "friends", "outgoing-requests"],
      });
    },
  });
};

export default useAddFriend;