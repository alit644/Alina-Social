import { RouterProvider } from "react-router";
import { router } from "./router";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/ui/PageLoader";
import { AuthContextProvider } from "./context/AuthProvider";
import MAlertDialog from "@/components/shared/MAlertDialog";
import { MDialog } from "@/components/shared/MDialog";
import CommentDrawer from "./components/shared/CommentDrawer";
import { useNotificationStore } from "./store/useNotifications";
import getUserId from "./helper/getUserId";
function App() {
  const { fetchUser, isLoading, getUserProfile } = useAuthStore();
  const { subscribeToNotifications } = useNotificationStore();
  useEffect(() => {
    fetchUser();
    getUserProfile();
  }, [fetchUser, getUserProfile]);

  useEffect(() => {
    const subscribe = async () => {
      const id = await getUserId();
      if (id) {
        subscribeToNotifications(id);
      }
    };
    subscribe();
    
  }, [subscribeToNotifications]);

  if (isLoading) return <PageLoader />;

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <MAlertDialog />
        <MDialog />
        <CommentDrawer />
      </AuthContextProvider>
    </>
  );
}

export default App;
