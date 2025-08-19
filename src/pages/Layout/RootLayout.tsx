import NavBar from "@/components/shared/NavBar";
import { Outlet, useLocation } from "react-router";
import AppSidebar from "@/components/shared/AppSidebar";
import SuggestedFriendCard from "@/components/SuggestedFriendCard";

const RootLayout = () => {
  const location = useLocation();

  const hideSuggested = ["/profile", "/profile/saved-post","/profile/settings", "/messages"].includes(
    location.pathname
  );

  return (
    <div>
      <NavBar />
      <div
        className="  grid 
      grid-cols-4 gap-[var(--gutter-mobile)] 
      sm:grid-cols-12 sm:gap-[var(--gutter-tablet)] sm:max-w-[var(--container-tablet)] 
      lg:gap-[var(--gutter-desktop)] lg:max-w-[var(--container-desktop)]
      mx-auto  bg-[#FBFBFB] dark:bg-[#1E1E1E] px-[var(--margin)]"
      >
        <div className="hidden sm:block sm:col-span-4 lg:col-span-3  mt-6">
          <AppSidebar />
        </div>
        <div className={`col-span-4 sm:col-span-8  mt-6 ${hideSuggested ? "lg:col-span-9" : "lg:col-span-6"}`}>
          <Outlet />
        </div>
        {/* Suggested Friends */}
        {!hideSuggested && (
          <div className="hidden lg:block lg:col-span-3 mt-6">
            <SuggestedFriendCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default RootLayout;
