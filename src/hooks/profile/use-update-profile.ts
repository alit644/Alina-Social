/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query"
import { useProfileStore } from "@/store/useProfile"

const useUpdateProfile = () => {
 const { updateProfile } = useProfileStore()
 return useMutation({
  mutationFn: async (data: any) => {
   await updateProfile(data)
  },
  
 })
}
export default useUpdateProfile
