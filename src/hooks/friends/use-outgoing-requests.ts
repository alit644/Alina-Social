import type { IFriendRequest } from "@/interfaces";
import { useFriendsStore } from "@/store/useFriends";
import { useQuery } from "@tanstack/react-query";

const useOutgoingRequests = () => {
  const { outgoingRequests } = useFriendsStore();
  return useQuery<IFriendRequest[]>({
    queryKey: ["profile", "friends", "outgoing-requests"],
    queryFn: async () => {
      const data = await outgoingRequests();
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
  });
};
export default useOutgoingRequests;
