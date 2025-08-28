import { useInfiniteQuery } from "@tanstack/react-query";
import { usePostStore } from "@/store/usePost";
const useUserPostById = (userID: string) => {
  const { getUserPostById } = usePostStore();
  return useInfiniteQuery({
    queryKey: [ "posts", "user-posts", userID],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getUserPostById(userID, pageParam, 2);
      return result;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage ?? undefined;
    },
  });
};
export default useUserPostById;
