import type { IFriendRequest } from "@/interfaces";
import { useFriendsStore } from "@/store/useFriends";
import { useQuery } from "@tanstack/react-query";

const useIncomingRequests = () => {
  const { IncomingRequests } = useFriendsStore();
  return useQuery<IFriendRequest[]>({
    queryKey: ["profile", "friends", "incoming-requests"],
    queryFn: async () => {
      const data = await IncomingRequests();
      return data;

    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
  });
};

export default useIncomingRequests;
