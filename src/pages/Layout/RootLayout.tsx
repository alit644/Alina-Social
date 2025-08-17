import NavBar from "@/components/shared/NavBar";
import { Outlet } from "react-router";
import AppSidebar from "@/components/shared/AppSidebar";
import SuggestedFriendCard from "@/components/SuggestedFriendCard";

const RootLayout = () => {
  return (
    <div>
      <NavBar />
      <div
        className="  grid 
      grid-cols-4 gap-[var(--gutter-mobile)] 
      sm:grid-cols-12 sm:gap-[var(--gutter-tablet)] sm:max-w-[var(--container-tablet)] 
      lg:gap-[var(--gutter-desktop)] lg:max-w-[var(--container-desktop)]
      mx-auto  bg-[#FBFBFB] px-[var(--margin)]"
      >
        <div className="hidden sm:block sm:col-span-4 lg:col-span-3  mt-6">
          <AppSidebar />
        </div>
        <div className="col-span-4 sm:col-span-8 lg:col-span-6 mt-8">
          <Outlet />
        </div>
        {/* Suggested Friends */}
        <div className="hidden lg:block lg:col-span-3  mt-6">
          <SuggestedFriendCard />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
