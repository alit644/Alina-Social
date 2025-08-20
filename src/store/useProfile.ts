/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import supabase from "@/supabase";
import { toast } from "sonner";
import { useAuthStore } from "./Auth/useAuthStore";
import type { IProfile } from "@/interfaces";
interface IUseProfile {
  isLoading: boolean;
  error: string | null;
  userProfile: any | null;
  updateProfile: (data: any) => Promise<void>;
  getUserProfile: (userID: string) => Promise<IProfile>;
}
export const useProfileStore = create<IUseProfile>((set) => ({
  isLoading: false,
  error: null,
  userProfile: null,
  updateProfile: async (data: any) => {
    set({ isLoading: true, error: null });
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

        if (uploadError) throw uploadError;

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
      if (updateErr) throw updateErr;
      console.log(updatedProfile);
      set({ userProfile: updatedProfile, isLoading: false, error: null });

      toast.success("Profile updated successfully", {
        style: {
          background: "var(--success-300)",
          border: "1px solid var(--success-500)",
          color: "#fff",
        },
        duration: 5000,
      });
    } catch (error) {
      console.log(error);
      set({ error: error as string, isLoading: false });
      toast.error("Error", {
        style: {
          background: "var(--danger-300)",
          border: "1px solid var(--danger-500)",
          color: "#fff",
        },
        description: error as string,
        duration: 5000,
      });
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
      if (error) throw error;
      set({ userProfile: data, isLoading: false, error: null });
      useAuthStore.setState({ userProfile: data });
      return data;
    } catch (error) {
      set({ error: error as string, isLoading: false });
    }
  },
}));
