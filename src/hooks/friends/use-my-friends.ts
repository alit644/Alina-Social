import { useFriendsStore } from "@/store/useFriends";
import { useQuery } from "@tanstack/react-query";

const useGetMyFriends = () => {
 const {getMyFriends} = useFriendsStore()
 return useQuery({
     queryKey: ["my-friends"],
     queryFn: async () => {
       const data = await getMyFriends();
       return data;
     },
     refetchOnWindowFocus: false,
     staleTime: 1000 * 60 * 5,
     refetchInterval: 1000 * 60 * 5,
   });
}
export default useGetMyFriends