import { Card } from "@/components/ui/card";
import MAvatar from "../shared/MAvatar";
import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import dayjs from "@/helper/dayjs";
import useDeleteComment from "@/hooks/comments/use-delete-comment";
interface ICommentCard {
  name: string;
  userName: string;
  avatar: string;
  comment: string;
  createdAt: string;
  userNow: string;
  commentID: string;
  
}
const CommentCard = ({
  name,
  userName,
  avatar,
  comment,
  createdAt,
  userNow,
  commentID,
}: ICommentCard) => {
  const { userProfile } = useAuthStore();
  const { mutateAsync , isPending } = useDeleteComment();
  const handleDeleteComment = useCallback(async () => {
    await mutateAsync(commentID);
  }, [commentID, mutateAsync]);

  return (
    <Card className="w-full rounded-md shadow-none border-0 p-4 mt-4">
      <div className={`flex items-center gap-2 justify-between`}>
        <div className="flex items-center gap-2 ">
          <MAvatar src={avatar} name={name} className="size-[50px]" />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{name} </h3>
            <p className="text-sm text-muted-foreground">{"@" + userName}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {/* delete comment */}
          {userProfile?.id === userNow && (
            <Button
              variant="ghost"
              className="hover:bg-[var(--danger-50)]"
              size="icon"
              disabled={isPending}
              onClick={handleDeleteComment}
            >
              <Trash className="h-5 w-5 text-[var(--neutral-500)]" />
            </Button>
          )}
          {/* time */}
          <p className="dark:text-[var(--neutral-400)] text-[var(--neutral-500)]">
            {dayjs(createdAt).fromNow()}
          </p>
        </div>
      </div>{" "}
      {/* comment */}
      <div>
        <p className="p2">{comment}</p>
      </div>
    </Card>
  );
};

export default memo(CommentCard);
