import { useQuery } from "@tanstack/react-query";
import { useFriendsStore } from "@/store/useFriends";

const useGetProfileStats = (userID: string) => {
  const { getProfileStats } = useFriendsStore();
  return useQuery({
    queryKey: ["profile","profileStats", userID],
    queryFn: async () => {
      const data = await getProfileStats(userID || "");
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
  });
};
export default useGetProfileStats;
