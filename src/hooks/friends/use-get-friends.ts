import { useInfiniteQuery } from "@tanstack/react-query";
import { useFriendsStore } from "@/store/useFriends";

const useGetFriends = (limit: number) => {
  const { getRandomFriends } = useFriendsStore();
  return useInfiniteQuery({
    queryKey: ["profile", "friends"],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getRandomFriends(limit, pageParam, 6);
      return result;
    },
    enabled: !!limit,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage ?? undefined;
    },
  });
};
export default useGetFriends;
