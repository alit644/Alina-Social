import PostCard from "@/components/post/PostCard";
import UserProfileCard from "@/components/shared/UserProfileCard";
import { useProfileStore } from "@/store/useProfile";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import NoResults from "@/components/shared/NoResults";
import type { IPost } from "@/interfaces";
import PostSkeleton from "@/components/shared/PostSkeleton";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import useUserPostById from "@/hooks/use-user-post";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
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

  const { getUserProfileById, isLoading: userProfileLoading } =
    useProfileStore();

  const { data: profileData, isLoading: userPost } = useQuery({
    queryKey: ["user-profile", userID],
    queryFn: async () => {
      const data = await getUserProfileById(userID || "");
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    enabled: !!userID,
  });

  const { data: userPosts , hasNextPage , fetchNextPage , isFetchingNextPage , isLoading: userPostLoading } = useUserPostById(userID || "");
  const rpcInfiniteDataPost = userPosts?.pages.flatMap(
    (page) => page?.data ?? []
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
          isLoadingProfile={userProfileLoading}
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
          <Button
            className="w-full mt-4 dark:bg-gray-800 dark:text-white"
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
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
