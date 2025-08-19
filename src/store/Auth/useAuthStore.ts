/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ISignUpData, ISignInData } from "@/interfaces";
import supabase from "@/supabase";
import { toast } from "sonner";
import { create } from "zustand";

interface IAuthStore {
  user: null | any;
  isLoading: boolean;
  error: null | string;
  userProfile: null | any;

  setUser: (user: any) => void;
  signUp: (data: ISignUpData) => Promise<void>;
  signIn: (data: ISignInData) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  fetchUser: () => Promise<void>;
  getUserProfile: () => Promise<void>;
  logout: () => Promise<void>;
  fetchSession: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isLoading: false,
  error: null,
  user: null,
  userProfile: null,
  //! ============ signUp ============
  setUser: (user) => set({ user }),
  //! signUp
  signUp: async (data: ISignUpData) => {
    try {
      set({ isLoading: true, error: null });
      const { data: userData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            username: data.username,
          },
        },
      });
      if (authError) {
        set({
          isLoading: false,
          error: authError?.message || "Something went wrong",
        });
        toast.error("Error", {
          style: {
            background: "var(--danger-300)",
            border: "1px solid var(--danger-500)",
            color: "#fff",
          },
          description: authError?.message || "Something went wrong",
          duration: 5000,
        });
        return;
      }

      // Create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userData.user?.id,
        email: data.email,
        username:
          userData.user?.user_metadata.username ||
          data.email.split("@")[0] ||
          data.username,
        created_at: new Date(),
      });

      if (profileError) {
        set({
          isLoading: false,
          error: profileError?.message || "Something went wrong",
        });
        toast.error("Error", {
          style: {
            background: "var(--danger-300)",
            border: "1px solid var(--danger-500)",
            color: "#fff",
          },
          description: profileError?.message || "Something went wrong",
          duration: 5000,
        });
        return;
      }

      set({ isLoading: false, error: null });
      window.location.href = "/";

      // window.location.href = "/";
    } catch (error) {
      set({ isLoading: false, error: error as string });
      console.error("Signup error:", error);
      toast.error("Error", {
        style: {
          background: "var(--danger-300)",
          border: "1px solid var(--danger-500)",
          color: "#fff",
        },
        description: "An unexpected error occurred",
        duration: 5000,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  //! signIn
  signIn: async (data: ISignInData) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        set({
          isLoading: false,
          error: error?.message || "Something went wrong",
        });
        toast.error("Error", {
          style: {
            background: "var(--danger-300)",
            border: "1px solid var(--danger-500)",
            color: "#fff",
          },
          description: error?.message || "Something went wrong",
          duration: 5000,
        });
      } else {
        set({ isLoading: false, error: null });
        window.location.href = "/";
      }
    } catch (error) {
      set({ isLoading: false, error: error as string });
      console.error("Signup error:", error);
      toast.error("Error", {
        style: {
          background: "var(--danger-300)",
          border: "1px solid var(--danger-500)",
          color: "#fff",
        },
        description: "An unexpected error occurred",
        duration: 5000,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  //! sign In With Google
  signInWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: user, error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:5173/",
        },
      });
      if (authError) {
        set({
          isLoading: false,
          error: authError?.message || "Something went wrong",
        });
        toast.error("Error", {
          style: {
            background: "var(--danger-300)",
            border: "1px solid var(--danger-500)",
            color: "#fff",
          },
          description: authError?.message || "Something went wrong",
          duration: 5000,
        });
        return;
      }

      set({ isLoading: false, error: null, user: user });
    } catch (error) {
      console.log(error);
      set({ isLoading: false, error: error as string });
      toast.error("Error", {
        style: {
          background: "var(--danger-300)",
          border: "1px solid var(--danger-500)",
          color: "#fff",
        },
        description: "An unexpected error occurred",
        duration: 5000,
      });
    } finally {
      set({ isLoading: false });
    }
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        try {
          const { error } = await supabase.from("profiles").upsert({
            id: session.user.id, // نفس id تبع auth
            email: session.user.email,
            username: session.user.user_metadata?.name,
            avatar_url: session.user.user_metadata?.picture,
            updated_at: new Date(), // الأفضل يكون updated بدل created
          });

          if (error) {
            set({
              isLoading: false,
              error: error.message || "Something went wrong",
            });
            toast.error("Error", {
              style: {
                background: "var(--danger-300)",
                border: "1px solid var(--danger-500)",
                color: "#fff",
              },
              description: error.message || "Something went wrong",
              duration: 5000,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  },
  //! Insert user in db Profile Table
  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      const session = data.session;
      if (!session?.user) {
        set({ user: null, isLoading: false });
        return;
      }

      const user = session.user;

      // upsert profile
      const { error: upsertError } = await supabase.from("profiles").upsert(
        {
          id: session.user.id,
          email: session.user.email,
          username: session.user.user_metadata?.name,
          avatar_url: session.user.user_metadata?.picture,
          created_at: new Date(),
        },
        { onConflict: "id" }
      );

      if (upsertError) throw upsertError;

      set({ user, isLoading: false, error: null });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      console.error("fetchUser error:", err);
    }
  },
  //! getUserProfile
  getUserProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const session = await supabase.auth.getSession();
      if (!session?.data.session) throw new Error("No session");
      const userID = session.data.session.user.id;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userID)
        .maybeSingle();
      if (error) throw error;
      set({ userProfile: data, isLoading: false, error: null });
    } catch (error) {
      set({ error: error as string, isLoading: false });
    }
  },
  //! logout
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, isLoading: false });
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
  fetchSession: async () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ user: session?.user ?? null, isLoading: false });
    });
    supabase.auth.onAuthStateChange((_, session) => {
      set({ user: session?.user ?? null, isLoading: false });
    });
  },
}));
