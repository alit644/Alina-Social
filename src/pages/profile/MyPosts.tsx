import PostCard from "@/components/post/PostCard";
import { usePostStore } from "@/store/usePost";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "@/components/ui/PageLoader";
import { useAuthStore } from "@/store/Auth/useAuthStore";

const MyPosts = () => {
  const { getUserPosts, isLoading } = usePostStore();
  const { userProfile } = useAuthStore();
  const { data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const data = await getUserPosts();
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime:  1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    
  });
  if(data?.length === 0) return <div>No Posts</div>
  const renderUserPost = data?.map((post) => (
    <PostCard
      key={post.id}
      createdAt={post.created_at}
      content={post.content}
      image_url={post.image_url}
      userName={userProfile?.username || ""}
      avatar={userProfile?.avatar_url || ""}
      name={userProfile?.full_name || ""}
      postID={post.user_id}
    />
  ));
  if (isLoading) return <PageLoader />;
  if (error) return <div>{error.message}</div>;
  return <>{renderUserPost}</>;
};

export default MyPosts;
