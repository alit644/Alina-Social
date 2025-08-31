import NavBar from "@/components/shared/NavBar";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import AppSidebar from "@/components/shared/AppSidebar";
import SuggestedFriendCard from "@/components/SuggestedFriendCard";

const RootLayout = () => {
  const location = useLocation();
  const username = location.pathname.startsWith("/user/")
    ? location.pathname.split("/")[2]
    : null;
  const conversationId = location.pathname.startsWith("/messages/")
    ? location.pathname.split("/")[2]
    : null;
  const hideSuggested = [
    "/profile",
    "/profile/saved-post",
    "/profile/settings",
    "/messages",
    "/all-friends",
    "/search",
    username,
  ].includes(location.pathname);

  return (
    <div>
      <NavBar />
      <div
        className="  grid 
      grid-cols-4 gap-[var(--gutter-mobile)] 
      sm:grid-cols-12 sm:gap-[var(--gutter-tablet)] sm:max-w-[var(--container-tablet)] 
      lg:gap-[var(--gutter-desktop)] lg:max-w-[var(--container-desktop)]
      mx-auto   px-[var(--margin)] "
      >
        <div className="hidden sm:block sm:col-span-4 lg:col-span-3  mt-6">
          <AppSidebar />
        </div>

        <main
          className={`col-span-4 sm:col-span-8  mt-6 ${
            hideSuggested || username !== null || conversationId !== null
              ? "lg:col-span-9"
              : "lg:col-span-6"
          }`}
        >
          <ScrollRestoration />
          <Outlet />
        </main>
        {/* Suggested Friends */}
        {!hideSuggested && username === null && conversationId === null && (
          <div className="hidden lg:block lg:col-span-3 mt-6">
            <SuggestedFriendCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default RootLayout;
