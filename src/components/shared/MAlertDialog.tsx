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
import { usePostStore } from "@/store/usePost";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
const MAlertDialog = () => {
  const { alertPostId, setAlertPostId } = useAlertDialogStore();
  const {deletePost , isLoading} = usePostStore();

  const onClose = () => {
    setAlertPostId(null);
  };
  const queryClient = useQueryClient();
  const onDelete = async () => {
   await deletePost(alertPostId || "");
    setAlertPostId(null);
    queryClient.invalidateQueries({ queryKey: ["posts"] });
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
            <Button disabled={isLoading}  variant="destructive">
            {isLoading && <Loader className="w-4 h-4 mr-2 animate-spin"/>} Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MAlertDialog;
