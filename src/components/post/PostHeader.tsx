import MAvatar from "@/components/shared/MAvatar";
import dayjs from "@/helper/dayjs";
import { memo } from "react";
import { Link } from "react-router";

interface PostHeaderProps {
  createdAt: string;
  add?: boolean;
  className?: string;
  name?: string;
  author_name?: string;
  author_avatar?: string;
  author_id?: string;
  postID?: string;
  children?: React.ReactNode;
}
const PostHeader = ({
  createdAt,
  className = "",
  name,
  author_name,
  author_avatar,
  author_id,
  children,
}: PostHeaderProps) => {
  return (
    <article
      className={`flex   justify-between items-center gap-2 ${className}`}
    >
      <Link to={`/user/${author_id}`}>
        <div className={`flex items-center gap-2 `}>
          <MAvatar
            src={author_avatar || ""}
            name={author_name || ""}
            className="size-[50px]"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{name} </h3>
            <p className="text-sm text-gray-500">@{author_name}</p>
          </div>
        </div>
      </Link>
      {/* options */}
      <div className="flex flex-col items-end">
        {children}
        <p className="text-[var(--neutral-400)]">
          {dayjs(createdAt).fromNow()}
        </p>
      </div>
    </article>
  );
};

export default memo(PostHeader);
