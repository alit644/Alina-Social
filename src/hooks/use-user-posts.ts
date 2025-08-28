import { useInfiniteQuery } from "@tanstack/react-query";
import { usePostStore } from "@/store/usePost";

// MY Post Hook
const useUserPosts = () => {
  const { getUserPosts } = usePostStore();
  return useInfiniteQuery({
   queryKey: ["posts" , "my-posts"],
   queryFn: async ({ pageParam = 1 }) => {
     const result = await getUserPosts(pageParam, 2);
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
export default useUserPosts;
