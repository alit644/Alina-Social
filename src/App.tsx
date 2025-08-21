import { RouterProvider } from "react-router";
import { router } from "./router";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/ui/PageLoader";
import { AuthContextProvider } from "./context/AuthProvider";
import MAlertDialog from "@/components/shared/MAlertDialog";
import {MDialog} from "@/components/shared/MDialog";
function App() {
  const { fetchUser, isLoading, getUserProfile } = useAuthStore();
  useEffect(() => {
    fetchUser();
    getUserProfile();
    return () => {
      // un subscribe
    }
  }, [fetchUser, getUserProfile]);

  if (isLoading) return <PageLoader />;

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <MAlertDialog />
        <MDialog />
      </AuthContextProvider>
    </>
  );
}

export default App;
