import MAvatar from "@/components/shared/MAvatar";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import useSendMessage from "@/hooks/messages/use-send-message";
import useFetchMessages from "@/hooks/messages/use-fetch-messages";
import PageLoader from "@/components/ui/PageLoader";
import { useEffect, useRef } from "react";
import supabase from "@/supabase";
import ErrorMessage from "@/components/error/ErrorMessage";
const MessageContent = () => {
  const { conversationId } = useParams();
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement>(null);
  // Realtime messages
  useEffect(() => {
    const channel = supabase
      .channel("custom-all-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          console.log("رسالة جديدة:", payload.new);

          queryClient.invalidateQueries({
            queryKey: ["messages", conversationId],
          });
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [conversationId, queryClient]);

  
  const form = useForm({
    resolver: zodResolver(
      z.object({
        text: z
          .string()
          .min(2, "Message is required")
          .max(200, "Message is too long"),
      })
    ),
  });
  const { mutateAsync, isPending } = useSendMessage(conversationId || "");
  const { userProfile } = useAuthStore();

  const onSubmit = async (data: { text: string }) => {
    try {
      await mutateAsync(data.text);

      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["messages", conversationId],
      });
    } catch (error) {
      console.log(error);
    }
  };
  const { data, isLoading , error } = useFetchMessages(conversationId || "");
  useEffect(() => {
   if (bottomRef.current) {
     bottomRef.current.scrollIntoView({ behavior: "smooth" });
     return () => {
       bottomRef.current = null;
     };
   }
 }, [data]);
 
  if (isLoading) return <PageLoader />;
  if (error) return <ErrorMessage />;
  return (
    <article className="w-full ">
      {/* messages content */}
      <article
        className={`w-full h-[calc(100vh-200px)] sm:h-[calc(100vh-250px)] overflow-y-auto  mb-4`}
      >
        {/* my messages */}
        {data?.length !== undefined && data?.length > 0 ? (
          data?.map((item) => {
            const isMe = item.sender_id === userProfile?.id;
            return (
              <div
                key={item.id}
                className={`flex ${
                  isMe ? "justify-end" : "justify-start"
                } gap-2`}
              >
                {!isMe && (
                  <MAvatar
                    src={item.sender?.avatar_url || ""}
                    name={item.sender?.username || ""}
                    className="size-10"
                  />
                )}

                <div
                  className={`px-3 py-2 flex flex-col gap-1 rounded-lg max-w-[70%] mb-2 ${
                    isMe
                      ? "bg-[var(--primary-800)] text-white rounded-br-none"
                      : "bg-gray-200 text-black rounded-bl-none"
                  }`}
                >
                  {!isMe && <h5 className="H5">{item.sender?.username}</h5>}
                  <p className="text-sm">{item.text}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <p className="text-center text-muted-foreground bg-gray-50  dark:bg-background p-4 rounded-sm">
              No messages , start a conversation
            </p>
          </div>
        )}
        <div ref={bottomRef} />

      </article>
      <section className="flex flex-row items-center gap-4 ">
        <MAvatar
          src={userProfile?.avatar_url || ""}
          name={userProfile?.username || ""}
          className="size-10"
        />
        <div className="flex-1 relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Input
                {...form.register("text")}
                placeholder="Type your message"
                className="w-full h-10"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="size-6 absolute right-4 bottom-2 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Send"
                disabled={isPending}
              >
                <Send className="w-6 h-6 text-[var(--primary-600)] hover:text-[var(--primary-900)] animate-pulse cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" />
              </Button>
              <FormMessage>{form.formState.errors.text?.message}</FormMessage>
            </form>
          </Form>
        </div>
      </section>
    </article>
  );
};

export default MessageContent;
