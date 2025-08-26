/* eslint-disable @typescript-eslint/no-explicit-any */
import getUserId from "@/helper/getUserId";
import notify from "@/helper/notify";
import type { INotification } from "@/interfaces";
import supabase from "@/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { toast } from "sonner";
import { create } from "zustand";
interface INotificationStore {
  isLoading: boolean;
  error: null | string;
  notifications: INotification[] | null;
  getNotifications: () => Promise<INotification[] | null | undefined>;
  subscribeToNotifications: (userID: string) => RealtimeChannel;
}
export const useNotificationStore = create<INotificationStore>((set) => ({
  isLoading: false,
  error: null,
  notifications: [],
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
      set({ isLoading: false, error: null, notifications: data });
      return data;
    } catch (error: any) {
      set({ isLoading: false, error: error as string });
      notify("error", error?.message || "Something went wrong , Oops...");
    }
  },
  subscribeToNotifications: (userID: string) => {
    const channel = supabase.channel("notifications-changes");
    channel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userID}`,
        },
        (payload) => {
          console.log("Change received:", payload);
          const newNotification = payload.new;
          set((state) => ({
            notifications: [...(state.notifications ?? []), newNotification as INotification],
          }));
          console.log(payload);
          toast.success(
            `${newNotification.fk_sender.full_name} liked your post`
          );
        }
      )
      .subscribe();

    return channel;
  },
}));
