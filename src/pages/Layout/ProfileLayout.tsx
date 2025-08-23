import ProfileInfoCard from "@/components/profile/ProfileInfoCard";
import { Outlet, useLocation } from "react-router";
import SuggestedFriendCard from "@/components/SuggestedFriendCard";

const ProfileLayout = () => {
  const location = useLocation();

  const hideSuggested = ["/profile/settings"].includes(location.pathname);

  return (
    <div
      className="
      mx-auto  bg-[#FBFBFB] dark:bg-[#1E1E1E] grid grid-cols-12 gap-[var(--gutter-mobile)] sm:gap-[var(--gutter-tablet)]"
    >
      <div className="col-span-12">
        <ProfileInfoCard />
      </div>
      <main className={`col-span-12 ${hideSuggested ? "col-span-12" : "lg:col-span-8"} m-0`}>
        <Outlet />
      </main>
      {
       !hideSuggested && (
        <div className="hidden lg:block lg:col-span-4">
        <SuggestedFriendCard />
      </div>
       )
      }
    </div>
  );
};

export default ProfileLayout;
