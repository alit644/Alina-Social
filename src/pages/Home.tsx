import AddPostCard from "@/components/post/AddPostCard";
import PostCard from "@/components/post/PostCard";
import PageLoader from "@/components/ui/PageLoader";
import type { IPost } from "@/interfaces";
import { usePostStore } from "@/store/usePost";
import { useQuery } from "@tanstack/react-query";
const Home = () => {
  //TODO: create new Post 1 part(one)      Done
  //TODO: get all posts 2 part(one)        Done
  //TODO: get only user posts 3 part(one)  Done
  //TODO: edit user post 4 part(one)       Done 1 TODO
  //TODO: delete user post 5 part(one)     Done
  //!=====================================
  //TODO: like post 6 part(two) Realtime   Done
  //TODO: unlike post 7 part(two) Realtime Done
  //!=====================================
  //TODO: comment post 8 part(three) Realtime
  //TODO: delete comment 9 part(three) Realtime
  //TODO: edit comment 10 part(three) Realtime
  //!=====================================
  //TODO: search user 11 part(four) Realtime
  //!=====================================
  //TODO: Message 12 part(five) Realtime
  //!=====================================
  //TODO: notification 13 part(six) Realtime
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


  if (isLoading) return <PageLoader />;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <AddPostCard />
      <div className="my-6">{renderPost}</div>
      
    </>
  );
};

export default Home;
