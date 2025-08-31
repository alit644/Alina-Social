import AddPostCard from "@/components/post/AddPostCard";
import PostCard from "@/components/post/PostCard";
import PostSkeleton from "@/components/shared/PostSkeleton";
import type { IPost } from "@/interfaces";
import { usePostStore } from "@/store/usePost";
import NoResults from "@/components/shared/NoResults";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import supabase from "@/supabase";
import useGetAllPosts from "@/hooks/posts/use-all-posts";
const Home = () => {

  useEffect(() => {
    const channel = usePostStore.getState().subscribeToLikes();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const {
    data: rpcInfiniteData,
    error: rpcError,
    isLoading: rpcLoading,
    fetchNextPage: rpcFetchNextPage,
    isFetchingNextPage: rpcIsFetchingNextPage,
    hasNextPage: rpcHasNextPage,
  } = useGetAllPosts()

  const rpcInfiniteDataPost = rpcInfiniteData?.pages.flatMap(
    (page) => page?.data ?? []
  );

  const renderPost = rpcInfiniteDataPost?.map((post: IPost | undefined) => {
    return (
      <PostCard
        key={post?.id}
        createdAt={post?.created_at || ""}
        content={post?.content || ""}
        image_url={post?.image_url || ""}
        name={post?.author_name || ""}
        author_avatar={post?.author_avatar || ""}
        author_id={post?.author_id || ""}
        postID={post?.id || ""}
        isLike={post?.is_liked}
        likes_count={post?.likes_count || 0}
      />
    );
  });

  if (rpcLoading) return <PostSkeleton />;
  if (rpcError) return <div>{rpcError.message}</div>;
  return (
    <>
      <AddPostCard />
      <div className="my-6">
        {renderPost?.length !== undefined && renderPost?.length > 0 ? (
          renderPost
        ) : (
          <NoResults />
        )}
        {rpcHasNextPage && (
          <Button
            className="w-full mt-4 dark:bg-gray-800 dark:text-white"
            onClick={() => rpcFetchNextPage()}
          >
            {rpcIsFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        )}
        {!rpcHasNextPage &&
          !rpcLoading &&
          rpcInfiniteDataPost?.length !== undefined &&
          rpcInfiniteDataPost?.length > 0 && (
            <div className="text-center py-6 text-muted-foreground text-sm">
              You&apos;ve reached the end!
            </div>
          )}
      </div>
    </>
  );
};

export default Home;
