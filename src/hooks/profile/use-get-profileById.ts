import { useProfileStore } from "@/store/useProfile";
import { useQuery } from "@tanstack/react-query";

const useGetProfileById = (userID:string) => {
 const {getUserProfileById}= useProfileStore()
 return useQuery({
  queryKey: [ "profile","user-profile", userID],
  queryFn: async () => {
    const data = await getUserProfileById(userID || "");
    return data;
  },
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60 * 5,
  refetchInterval: 1000 * 60 * 5,
  enabled: !!userID,
});
}
export default useGetProfileById
