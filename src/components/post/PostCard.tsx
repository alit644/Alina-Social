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
  author_name?: string;
  author_avatar?: string;
  author_id?: string;
  postID?: string;
  children?: React.ReactNode;
  isLike?: boolean;
  likes_count?: number;
}
const PostCard = ({
  createdAt,
  content,
  image_url,
  name,
  author_avatar,
  author_id,
  postID,
  children,
  isLike,
  likes_count
}: IPostCard) => {
  // get user profile
  const { userProfile } = useAuthStore();
  if (!author_id || !postID)
    return <div className="w-full h-full">Oops user or post not found...</div>;
  return (
    <Card className="mb-6 shadow-none rounded-md">
      <CardHeader className="pb-0  border-b border-input">
        <PostHeader
          createdAt={createdAt}
          name={name}
          author_name={''}
          author_avatar={author_avatar}
          author_id={author_id}
          postID={postID}
          children={children}
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-6  ">
        <PostContent content={content} image_url={image_url} />
      </CardContent>
      <CardFooter className="flex flex-col">
        <PostFooter postID={postID || ""} author_id={author_id || ""} isLike={isLike || false} likes_count={likes_count || 0}/>
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
