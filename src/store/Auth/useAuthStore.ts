/* eslint-disable @typescript-eslint/no-explicit-any */
import notify from "@/helper/notify";
import type { ISignUpData, ISignInData } from "@/interfaces";
import supabase from "@/supabase";
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

        notify("error", "Error", authError?.message || "Something went wrong");
        return;
      }

      set({ isLoading: false, error: null, user: userData.user });
      window.location.href = "/";
    } catch (error) {
      set({ isLoading: false, error: error as string });
      console.error("Signup error:", error);
      notify("error", "Error", "Something went wrong");
    } finally {
      set({ isLoading: false });
    }
  },
  //! signIn
  signIn: async (data: ISignInData) => {
    try {
      set({ isLoading: true, error: null });
      const { data: userData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        set({
          isLoading: false,
          error: error?.message || "Something went wrong",
        });
        notify("error", "Error", error?.message || "Something went wrong");
      } else {
        set({ isLoading: false, error: null, user: userData.user });
        window.location.href = "/";
      }
    } catch (error) {
      set({ isLoading: false, error: error as string });
      notify("error", "Error", "Something went wrong");
    } finally {
      set({ isLoading: false });
    }
  },
  //! sign In With Google
  signInWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: user, error: authError } =
        await supabase.auth.signInWithOAuth({
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
        notify("error", "Error", authError?.message || "Something went wrong");
        return;
      }

      set({ isLoading: false, error: null, user: user });
    } catch (error) {
      console.log(error);
      set({ isLoading: false, error: error as string });
      notify("error", "Error", "Something went wrong");
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
            notify("error", "Error", error.message || "Something went wrong");
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
          avatar_url: session.user.user_metadata?.avatar_url,
          email: session.user.email,
          full_name:
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name,
          username:
            session.user.user_metadata?.username ||
            session.user.user_metadata?.name,
          created_at: new Date(),
        },
        { onConflict: "id" }
      );

      if (upsertError) throw upsertError;

      // get profile from db
      const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

      set({ user, isLoading: false, error: null , userProfile: profile });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      console.error("fetchUser error:", err);
    }
  },
  //! getUserProfile
  // getUserProfile: async () => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const session = await supabase.auth.getSession();
  //     if (!session?.data.session) throw new Error("No session");
  //     const userID = session.data.session.user.id;
  //     const { data, error } = await supabase
  //       .from("profiles")
  //       .select("*")
  //       .eq("id", userID)
  //       .maybeSingle();

  //     if (error) throw error;
  //     set({ userProfile: data, isLoading: false, error: null });
  //   } catch (error) {
  //     set({ error: error as string, isLoading: false });
  //   }
  // },
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
