import { useAuth } from "@/hooks/useAuth";
import PageLoader from "./ui/PageLoader";
import { Navigate } from "react-router";
import { useAuthStore } from "@/store/Auth/useAuthStore";
interface ProtectedRouteProps {
  redirectIfAuthenticated?: boolean;
  children: React.ReactNode;
}

const ProtectedRoute = ({
  redirectIfAuthenticated = false,
  children,
}: ProtectedRouteProps) => {
  const authContext = useAuth();
  const loading = authContext ? authContext.loading : false;
  const { user } = useAuthStore();
  if (loading) return <PageLoader />;
  if (user && redirectIfAuthenticated) return <Navigate to="/" replace />;
  if (!user && !redirectIfAuthenticated)
    return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
