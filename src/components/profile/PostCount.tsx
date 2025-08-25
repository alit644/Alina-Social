import { memo } from "react";
import { Link } from "react-router";

const PostCount = ({
  data,
  isNav = true,
}: {
  data: { posts: number; friends: number };
  isNav?: boolean;
}) => {
  return (
    <section className="flex gap-5 ">
      <div id="posts" className="flex flex-col ">
        <h3 className="H4">{data?.posts === undefined ? 0 : data?.posts}</h3>
        <p className="p2">Posts</p>
      </div>
      <div id="friends" className="flex flex-col ">
        {isNav ? (
          <Link to="/friends">
            <h3 className="H4">
              {data?.friends === undefined ? 0 : data?.friends}
            </h3>
            <p className="p2">Friends</p>
          </Link>
        ) : (
          <>
            <h3 className="H4">
              {data?.friends === undefined ? 0 : data?.friends}
            </h3>
            <p className="p2">Friends</p>
          </>
        )}
      </div>
    </section>
  );
};

export default memo(PostCount);
