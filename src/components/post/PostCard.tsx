import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import PostContent from "@/components/post/PostContent";
import PostHeader from "@/components/post/PostHeader";
import PostFooter from "./PostFooter";
import CommentCard from "./CommentCard";
const PostCard = () => {
  return (
    <Card className="mt-6 shadow-none rounded-md">
      <CardHeader className=" pb-0   border-b border-input">
        <PostHeader name="Ali Talib" username="ali_talib" />
      </CardHeader>
      <CardContent className="flex flex-col gap-6  mx-6">
        <PostContent />
      </CardContent>
      <CardFooter className="flex flex-col">
        <PostFooter />
        <CommentCard />
      </CardFooter>
    </Card>
  );
};

export default PostCard;
