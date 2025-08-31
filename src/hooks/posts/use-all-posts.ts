import { useInfiniteQuery } from "@tanstack/react-query";
import { usePostStore } from "@/store/usePost";

const useGetAllPosts = () => {
  const { getAllPostsRPC } = usePostStore();
  return useInfiniteQuery({
    queryKey: ["posts", "all-posts"],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getAllPostsRPC(pageParam, 6);
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

export default useGetAllPosts;
