import type { IMessage } from "@/interfaces";
import { useMessagesStore } from "@/store/useMessages";
import { useQuery } from "@tanstack/react-query";

const useFetchMessages = (conversationId: string) => {
  const { fetchMessages } = useMessagesStore();
  return useQuery<IMessage[]>({
    queryKey: ["messages", conversationId],
    queryFn: async () => await fetchMessages(conversationId || ""),
    enabled: !!conversationId,
    refetchOnWindowFocus: false,
  });
};
export default useFetchMessages;
