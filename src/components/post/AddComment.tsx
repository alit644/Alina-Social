import { memo } from "react";
import MAvatar from "../shared/MAvatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Form } from "../ui/form";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAddComment from "@/hooks/comments/use-add-comment";
interface AddCommentProps {
  avatar?: string;
  name?: string;
  postID: string;
}
interface IFormInput {
  content: string;
}
const AddComment = ({ avatar, name, postID }: AddCommentProps) => {
  const form = useForm<IFormInput>({
    resolver: zodResolver(
      z.object({
        content: z
          .string()
          .min(2, "Comment must be at least 2 characters long"),
      })
    ),
  });
  const addCommentMutation = useAddComment(postID, form.getValues());

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    try {
      await addCommentMutation.mutateAsync();
      form.reset();
    } catch (error) {
      return error;
    }
  };

  return (
    <section className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4 mt-4 w-full relative">
            <MAvatar
              src={avatar || ""}
              name={name || ""}
              className="size-[40px]"
            />
            <Input
              placeholder="Add comment"
              className={`flex-1 h-10 ${
                form.formState.errors.content?.message
                  ? "border border-red-500 focus:border-red-500 focus:ring-red-500"
                  : ""
              }`}
              {...form.register("content")}
            />
            <Button
              variant="ghost"
              size="icon"
              className="size-6 absolute right-4 bottom-2"
              title="Send"
              disabled={addCommentMutation.isPending}
            >
              <Send className="w-6 h-6 text-[var(--primary-600)] hover:text-[var(--primary-900)] animate-pulse cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" />
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default memo(AddComment);
