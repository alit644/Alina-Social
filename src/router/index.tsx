import { lazy, type JSX, type LazyExoticComponent } from "react";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router";
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const Profile = lazy(() => import("@/pages/profile/profile"));
const SavedPost = lazy(() => import("@/pages/profile/SavedPost"));
const Settings = lazy(() => import("@/pages/profile/Settings"));
const General = lazy(() => import("@/pages/profile/General"));
const Messages = lazy(() => import("@/pages/messages/index"));
const MessageContent = lazy(() => import("@/pages/messages/MessageContent"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const IncomingRequests = lazy(() => import("@/pages/friends/IncomingRequests"));
const Friends = lazy(() => import("@/pages/friends/Friends"));
const AllFriends = lazy(() => import("@/pages/friends/AllFriends"));
const UserProfile = lazy(() => import("@/pages/profile/UserProfile"));
import RootLayout from "@/pages/Layout/RootLayout";
import PageLoader from "@/components/ui/PageLoader";
import ProfileLayout from "@/pages/Layout/ProfileLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import PostSkeleton from "@/components/shared/PostSkeleton";
const withSuspense = (Component: LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={<PageLoader />}>{<Component />}</Suspense>
);
export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute children={<RootLayout />} />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<PostSkeleton />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        Component: ProfileLayout,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PostSkeleton />}>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: "saved-post",
            element: (
              <Suspense fallback={<PostSkeleton />}>
                <SavedPost />
              </Suspense>
            ),
          },
          {
            path: "settings",
            Component: () => withSuspense(Settings),
            children: [
              {
                index: true,
                Component: () => withSuspense(General),
              },
            ],
          },
        ],
      },
      {
        path: "/messages",
        Component: () => withSuspense(Messages),
        children: [
          {
            index: true,
            Component: () => withSuspense(MessageContent),
          },
        ],
      },
      {
        path: "/notifications",
        Component: () => withSuspense(Notifications),
      },
      {
        path: "/friends",
        Component: () => withSuspense(Friends),
      },
      {
        path: "/friends/incoming-requests",
        Component: () => withSuspense(IncomingRequests),
      },
      {
        path: "/all-friends",
        Component: () => withSuspense(AllFriends),
      },
      {
        path: "/user/:userID",
        Component: () => withSuspense(UserProfile),
      },
    ],
  },
  {
    path: "/login",
    element: <ProtectedRoute redirectIfAuthenticated children={<Login />} />,
  },
  {
    path: "/register",
    element: <ProtectedRoute redirectIfAuthenticated children={<Register />} />,
  },
]);
