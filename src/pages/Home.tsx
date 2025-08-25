import AddPostCard from "@/components/post/AddPostCard";
import PostCard from "@/components/post/PostCard";
import PostSkeleton from "@/components/shared/PostSkeleton";
import type { IPost } from "@/interfaces";
import { usePostStore } from "@/store/usePost";
import { useQuery } from "@tanstack/react-query";
import NoResults from "@/components/shared/NoResults";
const Home = () => {
  //TODO: search user 11 part(four) Realtime
  //!=====================================
  //TODO: Message 12 part(five) Realtime
  //!=====================================
  //TODO: notification 13 part(six) Realtime
  //!=====================================
  //TODO: Add notify all store
  //!=====================================



  const { getAllPosts, isLoading } = usePostStore();
  const { data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      // get user profile
      const data = await getAllPosts();
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
  const renderPost = data?.map((post: IPost) => {
    return (
      <PostCard
        key={post.id}
        createdAt={post.created_at}
        content={post.content}
        image_url={post.image_url}
        userName={post.profiles?.username || ""}
        avatar={post.profiles?.avatar_url || ""}
        name={post.profiles?.full_name || ""}
        postID={post.id}
        userID={post.user_id}
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
      </div>
    </>
  );
};

export default Home;
