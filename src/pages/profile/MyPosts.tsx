import PostCard from "@/components/post/PostCard";
import { usePostStore } from "@/store/usePost";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useAlertDialogStore } from "@/store/useAlertDialog";
import { useCallback } from "react";
import { MDropddownMenu } from "@/components/shared/MDropddownMenu";
import PostSkeleton from "@/components/shared/PostSkeleton";
import NoResults from "@/components/shared/NoResults";
const MyPosts = () => {
  const { getUserPosts, isLoading } = usePostStore();
  const { userProfile } = useAuthStore();
  const { setAlertPostId } = useAlertDialogStore();
  const { data, error } = useQuery({
    queryKey: ["posts", "post"],
    queryFn: async () => {
      const data = await getUserPosts();
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  const openDropdown = useCallback(
    (postID: string) => {
      setAlertPostId(postID);
    },
    [setAlertPostId]
  );

  if (data?.length === 0) return <div>No Posts</div>;
  const renderUserPost = data?.map((post) => (
    <PostCard
      key={post.id}
      createdAt={post.created_at}
      content={post.content}
      image_url={post.image_url}
      userName={userProfile?.username || ""}
      avatar={userProfile?.avatar_url || ""}
      name={userProfile?.full_name || ""}
      postID={post.id}
      userID={post.user_id}
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
    </>
  );
};

export default MyPosts;
