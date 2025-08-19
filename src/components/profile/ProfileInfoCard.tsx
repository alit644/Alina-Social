import { Card, CardContent, CardFooter } from "@/components/ui/card";
import MAvatar from "@/components/shared/MAvatar";

import { Button } from "@/components/ui/button";
import { PROFILE_ITEMS } from "@/data";
import { NavLink } from "react-router";
import PostCount from "./PostCount";
import { useAuthStore } from "@/store/Auth/useAuthStore";
const ProfileInfoCard = () => {
 const {userProfile} = useAuthStore()
  const renderProfileLinks = PROFILE_ITEMS.map((item) => (
    <div key={item.id}>
      <Button variant="ghost" className="hidden sm:block text-[var(--neutral-600)]">
        <NavLink to={item.to} end>{item.name}</NavLink>
      </Button>
      <Button variant="ghost" className="block sm:hidden" size="icon">
       <NavLink to={item.to} end>
        <item.icon className="h-6 w-6 text-[var(--neutral-400)] mx-auto" />
       </NavLink>
      </Button>
    </div>
  ));
  return (
    <Card className=" shadow-none rounded-md m-0">
      <CardContent className=" flex justify-between flex-wrap gap-1 ">
        <div
          className={`flex items-center flex-col sm:flex-row gap-4 sm:gap-2   `}
        >
          <MAvatar
            src={userProfile?.avatar_url}
            name={userProfile?.username?.slice(0, 2).toUpperCase()}
            className="size-[60px] sm:size-[50px]"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{userProfile?.username}</h3>
            <p className="text-xs text-gray-500">@{userProfile?.email?.split("@")[0]}</p>
          </div>
        </div>
        {/* post count */}
        <PostCount />
      </CardContent>

      <CardFooter className="border-t border-input w-full">
        <section className="flex gap-6 justify-between sm:justify-start w-full">
         {renderProfileLinks}
        </section>
      </CardFooter>
    </Card>
  );
};

export default ProfileInfoCard;
