import PostCard from "@/components/post/PostCard";
import { Button } from "@/components/ui/button";
import { Ellipsis, Loader2 } from "lucide-react";
import { useAlertDialogStore } from "@/store/useAlertDialog";
import { useCallback } from "react";
import { MDropddownMenu } from "@/components/shared/MDropddownMenu";
import PostSkeleton from "@/components/shared/PostSkeleton";
import useUserPosts from "@/hooks/posts/use-user-posts";
import NoResults from "@/components/shared/NoResults";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver ";
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

  const loadMoreRef = useIntersectionObserver(
    () => fetchNextPage(),
    hasNextPage
  );

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
  if (error) return <NoResults />;
  return (
    <>
      {renderUserPost?.length !== undefined && renderUserPost?.length > 0 ? (
        renderUserPost
      ) : (
        <NoResults />
      )}
      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="h-10 flex justify-center items-center"
        >
          {isFetchingNextPage && (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin w-5 h-5 text-[var(--primary-900)]" />
              Loading...
            </div>
          )}
        </div>
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
