/* eslint-disable @typescript-eslint/no-explicit-any */
import getUserId from "@/helper/getUserId";
import notify from "@/helper/notify";
import supabase from "@/supabase";
import { create } from "zustand";

export interface ISearchResult {
  id: string;
  username: string;
  avatar_url: string;
  full_name: string;
}

interface ISearchStore {
  searchQuery: string;
  getSearchQuery: (searchQuery: string) => Promise<ISearchResult[] | null>;
}
export const useSearchStore = create<ISearchStore>(() => ({
  searchQuery: "",
  getSearchQuery: async (searchQuery: string) => {
    try {
      const userID = await getUserId();

      const { data: friendsData, error: friendsError } = await supabase
        .from("friend_requests")
        .select("sender_id, receiver_id")
        .or(`sender_id.eq.${userID},receiver_id.eq.${userID}`)
        .eq("status", "accepted");

      if (friendsError) throw friendsError;

      // نجيب الـ ids تبع الأصدقاء فقط
      const friendIds =
        friendsData?.map((fr) =>
          fr.sender_id === userID ? fr.receiver_id : fr.sender_id
        ) || [];

      let query = supabase
        .from("profiles")
        .select("id,username, avatar_url, full_name")
        .neq("id", userID)
        .ilike("username", `%${searchQuery}%`);

      if (friendIds.length > 0) {
        query = query.not("id", "in", `(${friendIds.join(",")})`);
      }
      const { data, error } = await query;
      if (error) {
        notify("error", error?.message || "Error Search User");
      }
      if (!searchQuery.trim()) return [];
      return data || [];
    } catch (error: any) {
      notify("error", error?.message || "Error Search User");
      return [];
    }
  },
}));
