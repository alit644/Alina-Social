import PostCard from "@/components/post/PostCard";
import UserProfileCard from "@/components/shared/UserProfileCard";
import { usePostStore } from "@/store/usePost";
import { useProfileStore } from "@/store/useProfile";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import NoResults from "@/components/shared/NoResults";
import type { IPost } from "@/interfaces";
import PostSkeleton from "@/components/shared/PostSkeleton";
import { useAuthStore } from "@/store/Auth/useAuthStore";
const UserProfile = () => {
  const { userID } = useParams();
  const navigate = useNavigate();
  // current user id
  const { userProfile } = useAuthStore();
  if(userProfile?.id === userID){
    navigate("/profile")
  }

  
  const { getUserPostById } = usePostStore();
  const { getUserProfileById, isLoading: userProfileLoading } = useProfileStore();

  const { data: profileData , isLoading: userPost } = useQuery({
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

  const { data: userPosts } = useQuery({
    queryKey: ["user-posts", userID],
    queryFn: async () => {
      const data = await getUserPostById(userID || "");
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
  const renderPost = userPosts?.map((post: IPost) => {
    return (
      <PostCard
        key={post.id}
        createdAt={post.created_at}
        content={post.content}
        image_url={post.image_url}
        userName={profileData?.username || ""}
        avatar={profileData?.avatar_url || ""}
        name={profileData?.full_name || ""}
        postID={post.id}
        userID={post.user_id}
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
        {userPost ? (
          <PostSkeleton />
        ) : renderPost?.length !== undefined && renderPost?.length > 0 ? (
          renderPost
        ) : (
          <NoResults />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
