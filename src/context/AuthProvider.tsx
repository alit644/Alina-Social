import { useEffect, useState } from "react";
import supabase from "@/supabase";
import { AuthContext } from "./AuthContext";
import { useAuthStore } from "@/store/Auth/useAuthStore";

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuthStore();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
     setUser(session?.user ?? null)
     setLoading(false)
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
        setLoading(false)
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ loading }}>{children}</AuthContext.Provider>
  );
};
