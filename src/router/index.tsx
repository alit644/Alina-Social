import { lazy, type JSX, type LazyExoticComponent } from "react";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router";
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
import RootLayout from "@/pages/Layout/RootLayout";
import PageLoader from "@/components/ui/PageLoader";
const withSuspense = (Component: LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={<PageLoader />}>{<Component />}</Suspense>
);
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: () => withSuspense(Home),
      },
    ],
  },
  {
    path: "/login",
    Component: () => withSuspense(Login),
  },
  {
    path: "/register",
    Component: () => withSuspense(Register),
  },
]);
