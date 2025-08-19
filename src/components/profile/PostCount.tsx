const postData = [
  {
    id: "posts",
    name: "Posts",
    count: 12,
  },
  {
    id: "followers",
    name: "Followers",
    count: 242,
  },
  {
    id: "following",
    name: "Following",
    count: 12,
  },
];
const PostCount = () => {
  return (
    <section className="flex gap-5 ">
      {postData.map((item) => (
        <div key={item.id} className="flex flex-col ">
          <h3 className="H4">{item.count}</h3>
          <p className="p2">{item.name}</p>
        </div>
      ))}
    </section>
  );
};

export default PostCount;
