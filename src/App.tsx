import { RouterProvider } from "react-router";
import { router } from "./router";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/ui/PageLoader";
import { AuthContextProvider } from "./context/AuthProvider";
import MAlertDialog from "@/components/shared/MAlertDialog";
import { MDialog } from "@/components/shared/MDialog";
import CommentDrawer from "./components/shared/CommentDrawer";
function App() {
  const { fetchUser, isLoading } = useAuthStore();
  useEffect(() => {
   fetchUser();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
