import { RouterProvider } from "react-router";
import { router } from "./router";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/ui/PageLoader";
import { AuthContextProvider } from "./context/AuthProvider";
function App() {
  const { fetchUser, isLoading, getUserProfile } = useAuthStore();
  useEffect(() => {
    fetchUser();
    getUserProfile();
  }, [fetchUser, getUserProfile]);

  if (isLoading) return <PageLoader />;

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
