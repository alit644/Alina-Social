import AddPostCard from "@/components/post/AddPostCard";
import PostCard from "@/components/post/PostCard";
import PostSkeleton from "@/components/shared/PostSkeleton";
import type { IPost } from "@/interfaces";
import { usePostStore } from "@/store/usePost";
import { useInfiniteQuery } from "@tanstack/react-query";
import NoResults from "@/components/shared/NoResults";
import { Button } from "@/components/ui/button";
const Home = () => {
  //TODO: search user 11 part(four) Realtime
  //!=====================================
  //TODO: Message 12 part(five) Realtime
  //!=====================================

  const { getAllPosts } = usePostStore();

  const {
    data: infiniteData,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["Posts"],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getAllPosts(pageParam, 2);
      return result;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage ?? undefined;
    },
  });
  const infiniteDataPost = infiniteData?.pages.flatMap(
    (page) => page?.data ?? []
  );

  const renderPost = infiniteDataPost?.map((post: IPost | undefined) => {
    return (
      <PostCard
        key={post?.id}
        createdAt={post?.created_at || ""}
        content={post?.content || ""}
        image_url={post?.image_url || ""}
        userName={post?.profiles?.username || ""}
        avatar={post?.profiles?.avatar_url || ""}
        name={post?.profiles?.full_name || ""}
        postID={post?.id || ""}
        userID={post?.user_id || ""}
      />
    );
  });

  if (isLoading) return <PostSkeleton />;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <AddPostCard />
      <div className="my-6">
        {renderPost?.length !== undefined && renderPost?.length > 0 ? (
          renderPost
        ) : (
          <NoResults />
        )}
        {hasNextPage && (
         <Button className="w-full mt-4 dark:bg-gray-800 dark:text-white" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        )}
         {!hasNextPage && !isLoading && infiniteDataPost?.length !== undefined && infiniteDataPost?.length > 0 && (
        <div className="text-center py-6 text-muted-foreground text-sm">
          You&apos;ve reached the end!
        </div>
      )}
      </div>
    </>
  );
};

export default Home;
