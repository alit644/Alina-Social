import supabase from "@/supabase";

const getUserId = async () => {
  const session = await supabase.auth.getSession();
  return session.data.session?.user.id ?? null;
};

export default getUserId;
