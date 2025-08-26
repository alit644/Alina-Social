import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useAlertDialogStore } from "@/store/useAlertDialog";
import CommentCard from "../post/CommentCard";
import AddComment from "../post/AddComment";
import { memo, useCallback } from "react";
import { useCommentStore } from "@/store/useComment";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import { Skeleton } from "../ui/skeleton";
import NoResults from "./NoResults";

const CommentDrawer = () => {
  const { openCommentDrawerId, setOpenCommentDrawerId } = useAlertDialogStore();
  const { getComments } = useCommentStore();
  // get user profile
  const { userProfile } = useAuthStore();

  const { data: comments, isFetching  } = useQuery({
    queryKey: ["comments", openCommentDrawerId],
    queryFn: async () => await getComments(openCommentDrawerId || ""),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    enabled: !!openCommentDrawerId,
  });

  const onClose = useCallback(() => {
    setOpenCommentDrawerId(null);
  }, [setOpenCommentDrawerId]);

  const renderComments = comments?.map((comment) => {
    return (
      <CommentCard
        key={comment.id}
        name={comment.profiles?.full_name || ""}
        userName={comment.profiles?.username || ""}
        avatar={comment.profiles?.avatar_url || ""}
        comment={comment.content}
        createdAt={comment.created_at}
        userNow={comment.profiles?.id || ""}
        commentID={comment.id}
      />
    );
  });
  if (isFetching) return <Skeleton className="h-[149px]" />;

  return (
    <Drawer open={openCommentDrawerId !== null} onOpenChange={onClose}>
      <DrawerContent>
        <div className="mx-auto mb-16 w-full max-w-md sm:max-w-[500px] md:max-w-[700px] relative h-[100vh] md:h-[75vh] overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Comments</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex flex-col gap-2">
              {comments?.length !== undefined && comments?.length > 0 ? (
                renderComments
              ) : (
                <NoResults />
              )}
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 pb-5 px-4 border-t border-input left-4 right-4 bg-background mx-auto w-full max-w-md sm:max-w-[500px] md:max-w-[700px] ">
          <AddComment
            postID={openCommentDrawerId || ""}
            avatar={userProfile?.avatar_url || ""}
            name={userProfile?.full_name || ""}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default memo(CommentDrawer);
