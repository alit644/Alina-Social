import { useQuery } from "@tanstack/react-query";
import type { IConversation } from "@/interfaces";
import { useMessagesStore } from "@/store/useMessages";

const useGetAllMyConversations = () => {
  const { getAllMyConversations } = useMessagesStore();
  return useQuery<IConversation[]>({
    queryKey: ["conversations"],
    queryFn: async () => await getAllMyConversations(),
    refetchOnWindowFocus: false,
  });
};

export default useGetAllMyConversations;
