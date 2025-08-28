import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAlertDialogStore } from "@/store/useAlertDialog";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import useDeletePost from "@/hooks/posts/use-delete-post";
const MAlertDialog = () => {
  const { alertPostId, setAlertPostId } = useAlertDialogStore();
  const {mutateAsync , isPending} = useDeletePost(alertPostId || "")
  const onClose = () => {
    setAlertPostId(null);
  };
  const onDelete = async () => {
   await mutateAsync();
    setAlertPostId(null);
  };
  return (
    <AlertDialog open={alertPostId !== null} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-600"  asChild onClick={onDelete}>
            <Button disabled={isPending}  variant="destructive">
            {isPending && <Loader className="w-4 h-4 mr-2 animate-spin"/>} Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MAlertDialog;
