import MAvatar from "@/components/shared/MAvatar";
import { memo } from "react";
import { Link } from "react-router";
interface PostHeaderProps {
  createdAt: string;
  add?: boolean;
  className?: string;
  name?: string;
  userName?: string;
  avatar?: string;
  userID?: string;
  postID?: string;
}
const PostHeader = ({
  createdAt,
  className = "",
  name,
  userName,
  avatar,
  userID
}: PostHeaderProps) => {
  return (
    <article
      className={`flex   justify-between items-center gap-2 ${className}`}
    >
      <Link to={`/user/${userID}`}>
        <div className={`flex items-center gap-2 `}>
          <MAvatar
            src={avatar || ""}
            name={name || ""}
            className="size-[50px]"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{name} </h3>
            <p className="text-sm text-gray-500">@{userName}</p>
          </div>
        </div>
      </Link>
      {/* options */}
      <div className="flex flex-col items-end">
        <>
          <p className="text-[var(--neutral-400)]">
            {createdAt?.split("T")[0]}
          </p>
        </>
      </div>
    </article>
  );
};

export default memo(PostHeader);
