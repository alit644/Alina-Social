import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import MAvatar from "./MAvatar";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import { NAVBAR_ITEMS } from "@/data";
const MobileNav = () => {
  const { userProfile } = useAuthStore();
  const renderLiks = NAVBAR_ITEMS.map((item) => {
    return (
      <NavigationMenuItem key={item.id}>
        <NavigationMenuLink asChild>
          <NavLink
            to={item.to}
            title={item.name}
            aria-label={item.name}
            className={({ isActive }) => (isActive ? "text-gray-900 " : "")}
          >
            <Button variant="ghost" size="icon">
              <item.icon className="h-9 w-9" />
              <span className="sr-only">{item.name}</span>
            </Button>
          </NavLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  });
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50  bg-background border-t sm:hidden">
      <NavigationMenu className="  w-full max-w-screen-sm ">
        <NavigationMenuList className="flex justify-between items-center p-2 max-w-full">
          {renderLiks}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink to="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Profile"
                  title="Profile"
                >
                  <MAvatar
                    src={userProfile?.avatar_url}
                    name={userProfile?.username?.slice(0, 2).toUpperCase()}
                    className="h-7 w-7"
                  />
                </Button>
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default memo(MobileNav);