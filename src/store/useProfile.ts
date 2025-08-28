/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import supabase from "@/supabase";
import { useAuthStore } from "./Auth/useAuthStore";
import type { IProfile } from "@/interfaces";
import notify from "@/helper/notify";
interface IUseProfile {
  isLoading: boolean;
  error: string | null;
  userProfile: any | null;
  updateProfile: (data: any) => Promise<void>;
  getUserProfile: (userID: string) => Promise<IProfile>;
  getUserProfileById: (userID: string) => Promise<IProfile>;
}
export const useProfileStore = create<IUseProfile>((set) => ({
  isLoading: false,
  error: null,
  userProfile: null,
  updateProfile: async (data: any) => {
    const { user, userProfile } = useAuthStore.getState();
    if (!user) return;
    try {
      let avataUrl = userProfile.avatar_url;
      if (data.avatar instanceof File) {
        const fileName = `${user.id}/${Date.now()}_${data.avatar.name}`;
        const { error: uploadError } = await supabase.storage
          .from("profile-image")
          .upload(fileName, data.avatar, {
            upsert: true, // يعني يبدل الملف إذا موجود
          });

        if (uploadError) {
         notify("error", uploadError?.message || "Error Update Profile");
         throw uploadError;
        }

        // جلب الرابط العام
        const { data: publicUrlData } = supabase.storage
          .from("profile-image")
          .getPublicUrl(fileName);
        avataUrl = publicUrlData.publicUrl;
      }

      const { error: updateErr, data: updatedProfile } = await supabase
        .from("profiles")
        .update({
          full_name: data.full_name,
          username: data.username,
          bio: data.bio,
          avatar_url: avataUrl,
        })
        .eq("id", user.id);
      if (updateErr) {
       notify("error", updateErr?.message || "Error Update Profile");
       throw updateErr;
      }
      set({ userProfile: updatedProfile, isLoading: false, error: null });

      notify("success", "Profile Successfully Updated");
    } catch (error : any) {
      set({ error: error?.message || "Error Update Profile", isLoading: false });
     notify("error", "Error Update Profile");
    }
  },
  getUserProfile: async (userID: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userID)
        .maybeSingle();
      if (error) {
       notify("error", error?.message || "Error Get User Profile");
       throw error;
      }
      set({ userProfile: data, isLoading: false, error: null });
      useAuthStore.setState({ userProfile: data });
      return data;
    } catch (error) {
      set({ error: error as string, isLoading: false });
    }
  },
  getUserProfileById: async (userID: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userID)
        .maybeSingle();
      if (error) {
       notify("error", error?.message || "Error Get User Profile");
       throw error;
      }
      set({ isLoading: false, error: null });
      return data;
    } catch (error) {
      set({ error: error as string, isLoading: false });
    }
  },
}));
