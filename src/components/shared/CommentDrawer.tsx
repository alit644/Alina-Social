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
import { useAuthStore } from "@/store/Auth/useAuthStore";
import { Skeleton } from "../ui/skeleton";
import NoResults from "./NoResults";
import useGetComments from "@/hooks/comments/use-get-comments";
import { Button } from "../ui/button";

const CommentDrawer = () => {
  const { openCommentDrawerId, setOpenCommentDrawerId } = useAlertDialogStore();
  // get user profile
  const { userProfile } = useAuthStore();

  const {
    data: comments,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetComments(openCommentDrawerId || "");
  const infiniteDataComments = comments?.pages.flatMap(
    (page) => page?.data ?? []
  );
  const onClose = useCallback(() => {
    setOpenCommentDrawerId(null);
  }, [setOpenCommentDrawerId]);

  const renderComments = infiniteDataComments?.map((comment) => {
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
              {infiniteDataComments?.length !== undefined &&
              infiniteDataComments?.length > 0 ? (
                renderComments
              ) : (
                <NoResults />
              )}
              {hasNextPage && (
                <Button
                  className="w-full mt-4 dark:bg-gray-800 dark:text-white"
                  onClick={() => fetchNextPage()}
                >
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </Button>
              )}
              {!hasNextPage &&
                !isFetching &&
                infiniteDataComments?.length !== undefined &&
                infiniteDataComments?.length > 0 && (
                  <div className="text-center py-6 text-muted-foreground text-sm">
                    You&apos;ve reached the end!
                  </div>
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
