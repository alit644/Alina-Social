/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  IFriend,
  IFriendRequest,
  IMFriend,
  IOutgoingRequest,
} from "@/interfaces";
import supabase from "@/supabase";
import { create } from "zustand";
import notify from "@/helper/notify";
import getUserId from "@/helper/getUserId";
interface IFriendsStore {
  isLoading: boolean;
  error: string | null;
  friends: IFriend[];
  getRandomFriends: () => Promise<IFriend[]>;
  addFriend: (receiver_id: string) => Promise<void>;
  IncomingRequests: () => Promise<IFriendRequest[]>;
  confirmRequest: (requestId: string) => Promise<void>;
  rejectRequest: (requestId: string) => Promise<void>;
  outgoingRequests: () => Promise<IOutgoingRequest[]>;
  cancelRequest: (requestId: string) => Promise<void>;
  getMyFriends: () => Promise<IMFriend[]>;
  unFollow: (friend_request_id: string) => Promise<void>;
  getProfileStats: (
    userID: string
  ) => Promise<{ posts: number; friends: number }>;
}
export const useFriendsStore = create<IFriendsStore>((set) => ({
  isLoading: false,
  error: null,
  friends: [],
  getRandomFriends: async () => {
    set({ isLoading: true, error: null });
    try {
      const userID = await getUserId();

      // 1- نجيب كل أصدقائي (accepted)
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

      const { data, error } = await supabase
        .from("profiles")
        .select("id,username, avatar_url, full_name")
        .not("id", "eq", userID)
        .not("id", "in", `(${friendIds.join(",") || "null"})`)
        .limit(8);
      if (error) throw error;
      set({ friends: data, isLoading: false, error: null });
      return data;
    } catch (error) {
      set({ error: error as string, isLoading: false });
      return [];
    }
  },
  addFriend: async (receiver_id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Current User
      const userID = await getUserId();
      if (!userID) throw new Error("No session");

      const { error: errAdd } = await supabase.from("friend_requests").insert({
        sender_id: userID,
        receiver_id,
        status: "pending",
      });

      if (errAdd) {
        notify(
          "error",
          "Error Add Friend",
          errAdd?.code === "23505"
            ? "Friend Request Already Sent"
            : "Something went wrong"
        );
        throw errAdd;
      }
      notify("success", "Friend Request Sent");
      set({ isLoading: false, error: null });
    } catch (error: any) {
      console.log(error);
      notify(
        "error",
        "Error Add Friend",
        error?.code === "23505"
          ? "Friend Request Already Sent"
          : "Something went wrong"
      );
      set({ error: error as string, isLoading: false });
    }
  },
  IncomingRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const userID = await getUserId();

      const { data, error } = await supabase
        .from("friend_requests")
        .select(
          `
         id,
         status,
         created_at,
         sender:sender_id (
           id,
           full_name,
           username,
           avatar_url
         )
       `
        )
        .eq("receiver_id", userID)
        .eq("status", "pending");
      if (error) throw error;
      set({ isLoading: false, error: null });
      return data;
    } catch (error) {
      console.log(error);
      notify("error", "Error Get Incoming Requests");
      set({ error: error as string, isLoading: false });
      return [];
    }
  },
  confirmRequest: async (requestId: string) => {
    set({ isLoading: true, error: null });
    try {
      const userID = await getUserId();
      const { error } = await supabase
        .from("friend_requests")
        .update({
          status: "accepted",
        })
        .eq("receiver_id", userID)
        .eq("id", requestId)
        .eq("status", "pending");

      if (error) throw error;
      notify("success", "Friend Request Accepted");
      set({ isLoading: false, error: null });
    } catch (error) {
      console.log(error);
      notify("error", "Error Accept Friend Request");
      set({ isLoading: false, error: error as string });
    }
  },
  rejectRequest: async (requestId: string) => {
    set({ isLoading: true, error: null });
    try {
      const userID = await getUserId();
      const { error } = await supabase
        .from("friend_requests")
        .delete()
        .eq("receiver_id", userID)
        .eq("id", requestId)
        .eq("status", "pending");

      if (error) throw error;
      notify("success", "Friend Request Rejected");
      set({ isLoading: false, error: null });
    } catch (error) {
      console.log(error);
      notify("error", "Error Reject Friend Request");
      set({ isLoading: false, error: error as string });
    }
  },
  outgoingRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const userID = await getUserId();
      const { data, error } = await supabase
        .from("friend_requests")
        .select(
          `
         id,
         status,
         created_at,
         receiver:receiver_id (
           id,
           full_name,
           username,
           avatar_url
         )
       `
        )
        .eq("sender_id", userID)
        .eq("status", "pending");
      if (error) throw error;
      set({ isLoading: false, error: null });
      return data;
    } catch (error) {
      console.log(error);
      notify("error", "Error Get Outgoing Requests");
      set({ error: error as string, isLoading: false });
      return [];
    }
  },
  cancelRequest: async (requestId: string) => {
    set({ isLoading: true, error: null });
    try {
      const userID = await getUserId();
      const { error } = await supabase
        .from("friend_requests")
        .delete()
        .eq("sender_id", userID)
        .eq("id", requestId)
        .eq("status", "pending");

      if (error) throw error;

      notify("success", "Friend Request Cancelled");
      set({ isLoading: false, error: null });
    } catch (error) {
      console.log(error);
      notify("error", "Error Cancel Friend Request");
      set({ isLoading: false, error: error as string });
    }
  },
  getMyFriends: async () => {
    set({ isLoading: true, error: null });
    try {
      const userID = await getUserId();
      const { data, error } = await supabase
        .from("friend_requests")
        .select(
          `
         id,
         created_at,
         sender:sender_id (
           id,
           full_name,
           username,
           avatar_url
         ),
         receiver:receiver_id (
           id,
           full_name,
           username,
           avatar_url
         )
       `
        )
        .or(`sender_id.eq.${userID},receiver_id.eq.${userID}`)
        .eq("status", "accepted");
      if (error) throw error;
      const friends = data?.map((fr) => {
        const sender = Array.isArray(fr.sender) ? fr.sender[0] : fr.sender;
        const receiver = Array.isArray(fr.receiver)
          ? fr.receiver[0]
          : fr.receiver;

        if (sender?.id === userID) {
          return {
            ...receiver,
            friend_request_id: fr.id,
          };
        } else {
          return {
            ...sender,
            friend_request_id: fr.id,
          };
        }
      });
      set({ isLoading: false, error: null });
      return friends;
    } catch (error) {
      console.log(error);
      notify("error", "Error Get My Friends");
      set({ error: error as string, isLoading: false });
      return [];
    }
  },
  unFollow: async (friend_request_id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from("friend_requests")
        .delete()
        .eq("id", friend_request_id)
        .eq("status", "accepted");

      if (error) throw error;

      notify("success", "Friend UnFollowed");
      set({ isLoading: false, error: null });
    } catch (error) {
      console.log(error);
      notify("error", "Error UnFollow Friend");
      set({ isLoading: false, error: error as string });
    }
  },
  getProfileStats: async (userID: string) => {
    set({ isLoading: true, error: null });
    try {
      // 1- عدد البوستات
      const { count: postsCount, error: postsError } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userID);

      if (postsError) throw postsError;

      // 2- عدد الأصدقاء
      const { count: friendsCount, error: friendsError } = await supabase
        .from("friend_requests")
        .select("*", { count: "exact", head: true })
        .or(`sender_id.eq.${userID},receiver_id.eq.${userID}`)
        .eq("status", "accepted");

      if (friendsError) throw friendsError;

      set({ isLoading: false, error: null });
      return {
        posts: postsCount ?? 0,
        friends: friendsCount ?? 0,
      };
    } catch (error) {
      console.error(error);
      set({ error: (error as Error).message, isLoading: false });
      return { posts: 0, friends: 0 };
    }
  },
}));
