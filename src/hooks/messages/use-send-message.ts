import { useMessagesStore } from "@/store/useMessages";
import { useMutation } from "@tanstack/react-query";

const useSendMessage = (conversationId: string, ) => {
  const { sendMessage } = useMessagesStore();
  return useMutation({
    mutationFn: async (message: string) => await sendMessage(conversationId, message),
    
  });
};
export default useSendMessage;
