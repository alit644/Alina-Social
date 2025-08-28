import PostCard from "@/components/post/PostCard";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useAlertDialogStore } from "@/store/useAlertDialog";
import { useCallback } from "react";
import { MDropddownMenu } from "@/components/shared/MDropddownMenu";
import PostSkeleton from "@/components/shared/PostSkeleton";
import NoResults from "@/components/shared/NoResults";
import useUserPosts from "@/hooks/use-user-posts";
const MyPosts = () => {
  const { setAlertPostId } = useAlertDialogStore();
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useUserPosts();

  const openDropdown = useCallback(
    (postID: string) => {
      setAlertPostId(postID);
    },
    [setAlertPostId]
  );
  const rpcInfiniteDataPost = data?.pages.flatMap((page) => page?.data ?? []);

  if (data?.pages?.length === 0) return <NoResults />;
  const renderUserPost = rpcInfiniteDataPost?.map((post) => (
    <PostCard
      key={post?.id}
      createdAt={post?.created_at}
      content={post.content}
      image_url={post.image_url}
      author_name={post?.author_name || ""}
      author_avatar={post?.author_avatar || ""}
      name={post?.author_name || ""}
      postID={post.id}
      author_id={post.author_id}
      isLike={post.is_liked}
      likes_count={post.likes_count}
    >
      <MDropddownMenu postId={post.id}>
        <Button
          variant="ghost"
          size="icon"
          className="text-end"
          onClick={() => openDropdown(post.id)}
        >
          <Ellipsis className="h-5 w-5 text-[var(--neutral-500)]" />
        </Button>
      </MDropddownMenu>
    </PostCard>
  ));

  if (isLoading) return <PostSkeleton />;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      {renderUserPost?.length !== undefined && renderUserPost?.length > 0 ? (
        renderUserPost
      ) : (
        <NoResults />
      )}
      {hasNextPage && (
        <Button
          className="w-full mt-4 dark:bg-gray-800 dark:text-white"
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )}
      {!hasNextPage &&
        !isLoading &&
        rpcInfiniteDataPost?.length !== undefined &&
        rpcInfiniteDataPost?.length > 0 && (
          <div className="text-center py-6 text-muted-foreground text-sm">
            You&apos;ve reached the end!
          </div>
        )}
    </>
  );
};

export default MyPosts;
