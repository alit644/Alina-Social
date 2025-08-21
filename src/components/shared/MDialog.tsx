import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAlertDialogStore } from "@/store/useAlertDialog";
import { useCallback, useEffect, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPostSchema } from "@/schema";
import { Form, FormMessage } from "@/components/ui/form";
import { Images, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePostStore } from "@/store/usePost";
import PageLoader from "../ui/PageLoader";
import { toast } from "sonner";
interface IFormInput {
  postContent: string;
  postImage?: File | string | null;
}
//TODO : عند اتمام علمبلة تحديث المنتج اعمل على تحديث المنتج في الواجهة 
export const MDialog = () => {
  const { openDialogId, setOpenDialogId } = useAlertDialogStore();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const { getOnePost, isLoading, updatePost } = usePostStore();
  const form = useForm<IFormInput>({
    resolver: zodResolver(addPostSchema),
  });

  // get one post
  const { data: onePostData, isFetching } = useQuery({
    queryKey: ["post", "posts", openDialogId],
    queryFn: async () => await getOnePost(openDialogId || ""),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    enabled: !!openDialogId,
  });
  const postImage = form.watch("postImage");
  useEffect(() => {
    if (onePostData) {
      form.setValue("postContent", onePostData[0].content);
      form.setValue("postImage", onePostData[0].image_url);
    }
  }, [onePostData, form]);

  const onClose = useCallback(() => {
    setOpenDialogId(null);
    form.reset();
  }, [setOpenDialogId, form]);

  // update Mutation
  const mutation = useMutation({
    mutationFn: async (data: IFormInput) => {
     await updatePost(openDialogId || "", {
        content: data.postContent || "",
        image_url: data.postImage,
      });
    },
    onSuccess: () => {
      onClose();
      queryClient.setQueryData(["post", openDialogId], {
        content: form.getValues("postContent"),
        image_url: form.getValues("postImage"),
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error Update Post", {
        style: {
          background: "var(--danger-300)",
          border: "1px solid var(--danger-500)",
          color: "#fff",
        },
        duration: 5000,
      });
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await mutation.mutateAsync(data);
    onClose();
  };

  const handleAddImage = useCallback(() => {
    inputRef.current?.click();
  }, []);
  if (isFetching) {
    return <PageLoader />;
  }
  return (
    <Dialog open={openDialogId !== null} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Post</DialogTitle>
              <DialogDescription>
                Make changes to your post here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 mt-4">
              <div className="grid gap-3">
                <Label htmlFor="postContent">Post Content</Label>
                <Input id="postContent" {...form.register("postContent")} />
                <FormMessage>
                  {form.formState.errors.postContent?.message}
                </FormMessage>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="postImage">Post Image</Label>
                <Input
                  id="postImage"
                  {...form.register("postImage")}
                  type="file"
                  accept="image/*"
                  hidden
                  ref={inputRef}
                  onChange={(e) => {
                    form.setValue("postImage", e.target.files?.[0]);
                  }}
                />
                <div className="grid gap-3">
                  <Button
                    variant="ghost"
                    className="w-fit"
                    type="button"
                    onClick={handleAddImage}
                  >
                    <Images className="h-4 w-4 mr-2" /> Change Photo
                  </Button>
                </div>

                {postImage !== null && (
                  <div className="size-40 my-2 relative">
                    {postImage && (
                      <>
                        {/* image preview */}
                        <div className="size-40 ">
                          {postImage && (
                            <img
                              src={
                                postImage instanceof File
                                  ? URL.createObjectURL(postImage)
                                  : (postImage as string)
                              }
                              alt="post image"
                              aria-label="post image"
                              className="w-full h-full rounded-md object-cover"
                            />
                          )}
                        </div>
                        {/* delete image */}
                        {postImage && (
                          <Button
                            variant={"neutral"}
                            type="button"
                            size={"icon"}
                            className="size-5 absolute top-[-10px] right-2"
                            onClick={() => form.setValue("postImage", null)}
                          >
                            <X className="size-4 " />
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                )}

                <FormMessage>
                  {form.formState.errors.postImage?.message}
                </FormMessage>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild onClick={onClose}>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
