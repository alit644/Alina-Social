/* eslint-disable @typescript-eslint/no-explicit-any */
import getUserId from "@/helper/getUserId";
import notify from "@/helper/notify";
import type { INotification } from "@/interfaces";
import supabase from "@/supabase";
import { create } from "zustand";
interface INotificationStore {
  isLoading: boolean;
  error: null | string;
  getNotifications: () => Promise<INotification[] | null | undefined>;
}
export const useNotificationStore = create<INotificationStore>((set) => ({
  isLoading: false,
  error: null,
  getNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      const userID = await getUserId();
      const { data, error: getErr } = await supabase
        .from("notifications")
        .select("* , fk_sender:sender_id (avatar_url, full_name, username)")
        .eq("user_id", userID)
        .order("created_at")
        .limit(10);
      if (getErr) {
        notify("error", getErr?.message || "Something went wrong , Oops...");
      }
      set({ isLoading: false, error: null });
      return data;
    } catch (error: any) {
      set({ isLoading: false, error: error as string });
      notify("error", error?.message || "Something went wrong , Oops...");
    }
  },
}));
