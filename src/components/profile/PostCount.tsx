import { useFriendsStore } from "@/store/useFriends";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

const PostCount = () => {
 const {getProfileStats} =useFriendsStore()
 const {data}= useQuery({
  queryKey:["profileStats" ],
  queryFn:async()=>{
    const data = await getProfileStats()
    return data
   },
   refetchOnWindowFocus:false,
   staleTime:1000*60*5,
   refetchInterval:1000*60*5
  })
  return (
    <section className="flex gap-5 ">
      <div id="posts" className="flex flex-col ">
        <h3 className="H4">{data?.posts === undefined ? 0 : data?.posts}</h3>
        <p className="p2">Posts</p>
      </div>
      <div id="friends" className="flex flex-col ">
        <Link to="/friends">
          <h3 className="H4">{data?.friends === undefined ? 0 : data?.friends}</h3>
          <p className="p2">Friends</p>
        </Link>
      </div>
    </section>
  );
};

export default PostCount;
