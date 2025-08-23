import { memo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import PostContent from "@/components/post/PostContent";
import PostHeader from "@/components/post/PostHeader";
import PostFooter from "@/components/post/PostFooter";
import AddComment from "@/components/post/AddComment";
import { useAuthStore } from "@/store/Auth/useAuthStore";
interface IPostCard {
  createdAt: string;
  content: string;
  image_url?: string;
  name?: string;
  userName?: string;
  avatar?: string;
  userID?: string;
  postID?: string;
  children?: React.ReactNode;
}
const PostCard = ({
  createdAt,
  content,
  image_url,
  name,
  userName,
  avatar,
  userID,
  postID,
  children,
}: IPostCard) => {
  // get user profile
  const { userProfile } = useAuthStore();
  if (!userID || !postID)
    return <div className="w-full h-full">Oops user or post not found...</div>;
  return (
    <Card className="mb-6 shadow-none rounded-md">
      <CardHeader className="pb-0  border-b border-input">
        <PostHeader
          createdAt={createdAt}
          name={name}
          userName={userName}
          avatar={avatar}
          userID={userID}
          postID={postID}
          children={children}
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-6  ">
        <PostContent content={content} image_url={image_url} />
      </CardContent>
      <CardFooter className="flex flex-col">
        <PostFooter postID={postID || ""} userID={userID || ""} />
        <AddComment
          avatar={userProfile?.avatar_url || ""}
          name={userProfile?.full_name || ""}
          postID={postID || ""}
        />
      </CardFooter>
    </Card>
  );
};

export default memo(PostCard);
