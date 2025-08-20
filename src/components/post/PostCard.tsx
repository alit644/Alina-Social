import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import PostContent from "@/components/post/PostContent";
import PostHeader from "@/components/post/PostHeader";
import PostFooter from "./PostFooter";
interface IPostCard {
  createdAt: string;
  content: string;
  image_url?: string;
  name?: string;
  userName?: string;
  avatar?: string;
  postID?: string;
}
const PostCard = ({
  createdAt,
  content,
  image_url,
  name,
  userName,
  avatar,
  postID,
}: IPostCard) => {
  return (
    <Card className="mb-6  shadow-none rounded-md">
      <CardHeader className="pb-0  border-b border-input">
        <PostHeader  createdAt={createdAt} name={name} userName={userName} avatar={avatar} postID={postID} />
      </CardHeader>
      <CardContent className="flex flex-col gap-6  ">
        <PostContent content={content} image_url={image_url}/>
      </CardContent>
      <CardFooter className="flex flex-col">
        <PostFooter />
        {/* <CommentCard /> */}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
