import { memo } from "react";

interface IPostContent {
  content: string;
  image_url?: string;
}
const PostContent = ({ content, image_url }: IPostContent) => {
  return (
    <>
      <p className="p2">{content}</p>
      {image_url && (
        <img
        loading="lazy"
          src={`${image_url}`}
          alt="Post main Image "
          className="w-full rounded-md max-h-[400px] object-cover"
          aria-label="post-image"
        />
      )}
    </>
  );
};

export default memo(PostContent);
