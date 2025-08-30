import { useQuery } from "@tanstack/react-query";
import type { IConversation } from "@/interfaces";
import { useMessagesStore } from "@/store/useMessages";

const useGetAllMyConversations = () => {
  const { getAllMyConversations } = useMessagesStore();
  return useQuery<IConversation[]>({
    queryKey: ["conversations"],
    queryFn: async () => await getAllMyConversations(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
  });
};

export default useGetAllMyConversations;
