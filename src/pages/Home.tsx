import AddPostCard from "@/components/post/AddPostCard";
import PostCard from "@/components/post/PostCard";
const Home = () => {
  return (
    <>
      <AddPostCard />
      <div className="my-6">
        <PostCard />
      </div>
    </>
  );
};

export default Home;
