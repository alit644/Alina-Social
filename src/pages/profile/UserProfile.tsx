import PostCard from "@/components/post/PostCard";
import UserProfileCard from "@/components/shared/UserProfileCard";
import { useNavigate, useParams } from "react-router";
import NoResults from "@/components/shared/NoResults";
import type { IPost } from "@/interfaces";
import PostSkeleton from "@/components/shared/PostSkeleton";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import useUserPostById from "@/hooks/posts/use-user-post";
import { useEffect } from "react";
import useGetProfileById from "@/hooks/profile/use-get-profileById";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver ";
import { Loader2 } from "lucide-react";
const UserProfile = () => {
  const { userID } = useParams();
  const navigate = useNavigate();
  // current user id
  const { userProfile } = useAuthStore();
  useEffect(() => {
    if (userProfile?.id === userID) {
      navigate("/profile");
    }
  }, [userProfile?.id, userID, navigate]);

  const { data: profileData, isLoading: userPost } = useGetProfileById(
    userID || ""
  );

  const {
    data: userPosts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: userPostLoading,
  } = useUserPostById(userID || "");
  const rpcInfiniteDataPost = userPosts?.pages.flatMap(
    (page) => page?.data ?? []
  );

  const loadMoreRef = useIntersectionObserver(
    () => fetchNextPage(),
    hasNextPage
  );

  const renderPost = rpcInfiniteDataPost?.map((post: IPost) => {
    return (
      <PostCard
        key={post.id}
        createdAt={post.created_at}
        content={post.content}
        image_url={post.image_url}
        name={profileData?.full_name || ""}
        author_avatar={profileData?.avatar_url || ""}
        author_id={profileData?.id || ""}
        postID={post.id}
        isLike={post.is_liked}
        likes_count={post.likes_count}
      />
    );
  });

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <UserProfileCard
          data={profileData !== undefined ? profileData : {}}
          isLoadingProfile={userPost}
        />
      </div>

      {/* User Post */}
      <div className="col-span-12 lg:col-span-8">
        {userPost || userPostLoading ? (
          <PostSkeleton />
        ) : renderPost?.length !== undefined && renderPost?.length > 0 ? (
          renderPost
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
          !userPostLoading &&
          rpcInfiniteDataPost?.length !== undefined &&
          rpcInfiniteDataPost?.length > 0 && (
            <div className="text-center py-6 text-muted-foreground text-sm">
              You&apos;ve reached the end!
            </div>
          )}
      </div>
    </div>
  );
};

export default UserProfile;
