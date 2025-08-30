/* eslint-disable @typescript-eslint/no-explicit-any */
import getUserId from "@/helper/getUserId";
import notify from "@/helper/notify";
import supabase from "@/supabase";
import { create } from "zustand";
interface IConversation {
  conversationId: string | null;
  isConversation: (
    friendId: string,
    navigate: any
  ) => Promise<string[] | null | undefined>;
  getAllMyConversations: () => Promise<any>;
  sendMessage: (conversationId: string, message: string) => Promise<any>;
  fetchMessages: (conversationId: string) => Promise<any>;
}

export const useMessagesStore = create<IConversation>(() => ({
  conversationId: null,
  // البحث عن محادثة سابقة
  isConversation: async (friendId: string, navigate: any) => {
    try {
      const currentUserId = await getUserId();
      const { data: exist } = await supabase
        .from("conversations")
        .select("*")
        .or(
          `and(user1_id.eq.${currentUserId},user2_id.eq.${friendId}),and(user1_id.eq.${friendId},user2_id.eq.${currentUserId})`
        );
      let conversationId = exist?.map((item) => item.id);
      if (!conversationId || conversationId.length === 0) {
        const { data, error } = await supabase
          .from("conversations")
          .insert([
            {
              user1_id: currentUserId,
              user2_id: friendId,
            },
          ])
          .select("id")
          .single();

        if (error) throw error;
        conversationId = [data.id];
      }
      navigate(`/messages/${conversationId}`);
      return conversationId;
    } catch (error) {
      console.log(error);
    }
  },
  getAllMyConversations: async () => {
    try {
      const currentUserId = await getUserId();
      const { data: conversations, error } = await supabase
        .from("conversations")
        .select(
          `
       id,
       user1:profiles!conversations_user1_id_fkey (id, username, avatar_url),
       user2:profiles!conversations_user2_id_fkey (id, username, avatar_url),
       created_at
     `
        )
        .or(`user1_id.eq.${currentUserId},user2_id.eq.${currentUserId}`)
        .order("created_at", { ascending: false });
      if (error) {
        notify("error", error?.message || "Something went wrong");
        throw error;
      }
      return conversations;
    } catch (error: any) {
      notify("error", error?.message || "Something went wrong");
      throw error;
    }
  },
  sendMessage: async (conversationId: string, message: string) => {
    try {
      const currentUserId = await getUserId();
      const { data, error } = await supabase
        .from("messages")
        .insert([
          {
            conversation_id: conversationId,
            sender_id: currentUserId,
            text: message,
          },
        ])
        .select("id")
        .single();
      if (error) {
        notify("error", error?.message || "Something went wrong");
        throw error;
      }
      notify("success", "Message Sent Successfully");
      return data;
    } catch (error: any) {
      notify("error", error?.message || "Something went wrong");
      throw error;
    }
  },
  fetchMessages: async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*, sender:profiles(username, avatar_url, full_name)")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });
      if (error) {
        notify("error", error?.message || "Something went wrong");
        throw error;
      }
      return data;
    } catch (error: any) {
      notify("error", error?.message || "Something went wrong");
      throw error;
    }
  },
}));
