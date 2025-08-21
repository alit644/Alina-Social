import MAvatar from "@/components/shared/MAvatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
interface PostHeaderProps {
  createdAt: string;
  add?: boolean;
  className?: string;
  name?: string;
  userName?: string;
  avatar?: string;
  userID?: string;
  postID?: string;
  children?: React.ReactNode;
}
const PostHeader = ({
  createdAt,
  add = false,
  className = "",
  name,
  userName,
  avatar,
  children,
}: PostHeaderProps) => {
  return (
    <article
      className={`flex   justify-between items-center gap-2 ${className}`}
    >
      <div className={`flex items-center gap-2 `}>
        <MAvatar src={avatar || ""} name={name || ""} className="size-[50px]" />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{name} </h3>
          <p className="text-sm text-gray-500">@{userName}</p>
        </div>
      </div>
      {/* options */}
      <div className="flex flex-col items-end">
        <>
         {children}
          <p className="text-[var(--neutral-400)]">
            {createdAt?.split("T")[0]}
          </p>
        </>
        {add && (
          <Button
            variant="ghost"
            size="icon"
            className="text-end bg-[var(--neutral-50)] hover:bg-[var(--neutral-100)] animate-accordion-up"
          >
            <Plus className="h-5 w-5 text-[var(--neutral-500)] hover:text-[var(--primary-900)]" />
          </Button>
        )}
      </div>
    </article>
  );
};

export default PostHeader;
