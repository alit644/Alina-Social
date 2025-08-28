import { useProfileStore } from "@/store/useProfile";
import { useQuery } from "@tanstack/react-query";

const useGetUserProfile = (userID:string) => {
 const {getUserProfile} = useProfileStore();
 return useQuery({
     queryKey: ["profile", userID],
     queryFn: async () => {
       const data = await getUserProfile(userID);
       return data;
     },
     refetchOnWindowFocus: false,
     staleTime: 60 * 60 * 2,
     refetchInterval: 60 * 60 * 2,
   });
}
export default useGetUserProfile