import { useQuery } from "@tanstack/react-query";
import { usePostStore } from "@/store/usePost";

const useGetPost = (openDialogId:string) => {
 const {getOnePost} = usePostStore();
 return useQuery({
     queryKey: ["posts" , "rpc", {scope: "one-post" , openDialogId}],
     queryFn: async () => await getOnePost(openDialogId || ""),
     refetchOnWindowFocus: false,
     enabled: !!openDialogId,
   });
}
export default useGetPost