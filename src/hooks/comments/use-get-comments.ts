import { useInfiniteQuery } from "@tanstack/react-query"
import { useCommentStore } from "@/store/useComment"

const useGetComments = (postID: string) => {
 const { getComments } = useCommentStore();
 return useInfiniteQuery({
  queryKey: ["comments", postID],
  queryFn: async ({ pageParam = 1 }) => {
    const result = await getComments(postID, pageParam, 6);
    return result;
  },
  enabled: !!postID,
  initialPageParam: 1,
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60 * 3,
  getNextPageParam: (lastPage) => {
    return lastPage?.nextPage ?? undefined;
  },
 })
}
export default useGetComments