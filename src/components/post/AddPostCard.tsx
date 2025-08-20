import { useCallback, useRef } from "react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import MAvatar from "@/components/shared/MAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Images, Loader, X } from "lucide-react";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Form, FormItem, FormControl, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPostSchema } from "@/schema";
import { usePostStore } from "@/store/usePost";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
interface IFormInput {
  postContent: string;
  postImage?: File | string;
}
const AddPostCard = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { userProfile } = useAuthStore();
  const { createPost,isLoading } = usePostStore();
  const queryClient = useQueryClient();
  const form = useForm<IFormInput>({
    resolver: zodResolver(addPostSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
   try {
    await createPost({
      content: data.postContent,
      image_url: data.postImage,
    });
    queryClient.invalidateQueries({ queryKey: ["posts"] });
   
     form.reset();
   } catch (error) {
    console.log(error)
    toast.error("Error Create Post", {
      style: {
        background: "var(--danger-300)",
        border: "1px solid var(--danger-500)",
        color: "#fff",
      },
      duration: 5000,
     });
    
   }
  };
  const handleAddImage = useCallback(() => {
    inputRef.current?.click();
  }, []);
  return (
    <Card className="shadow-none rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="flex justify-between flex-row items-center gap-2">
            <MAvatar
              src={userProfile?.avatar_url}
              name={userProfile?.username?.slice(0, 2).toUpperCase()}
              className="size-10"
            />
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="What's on your mind?"
                  className="h-10 w-full border-0 border-b border-input focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none rounded-none"
                  {...form.register("postContent")}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.postContent?.message}
              </FormMessage>
            </FormItem>
          </CardHeader>
          {/* hidden input */}
          <FormItem className="w-full">
            <FormControl>
              <Input
                placeholder="Add Image"
                type="file"
                className="h-10 w-full border-0 border-b border-input focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none rounded-none"
                {...form.register("postImage")}
                ref={inputRef}
                onChange={(e) => {
                  form.setValue("postImage", e.target.files?.[0]);
                }}
                hidden
              />
            </FormControl>
          </FormItem>
          <CardFooter className="flex flex-col mt-2 ">
            <div className="flex justify-between items-center w-full gap-2 ">
              <Button variant="ghost" type="button" onClick={handleAddImage}>
                <Images className="h-4 w-4 mr-2" /> Add Photo
              </Button>
              <Button size={"rounded"} type="submit" disabled={isLoading}>
               {isLoading && <Loader className="h-4 w-4 mr-2 animate-spin" />}
               Post</Button>
            </div>
            {form.watch("postImage") && (
              <>
                {/* image preview */}
                <div className="size-52 mt-2 ">
                  {form.watch("postImage") && (
                    <img
                      src={
                        form.watch("postImage") &&
                        form.watch("postImage") instanceof File
                          ? URL.createObjectURL(form.watch("postImage") as File)
                          : ""
                      }
                      alt="post image"
                      aria-label="post image"
                      className="w-full h-full rounded-md object-cover"
                    />
                  )}
                </div>
                {/* delete image */}

                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => form.setValue("postImage", undefined)}
                  className="  w-fit mt-2 "
                >
                  <X className="size-4 mr-2" /> Remove Image
                </Button>
              </>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AddPostCard;
