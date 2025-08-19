import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Home, Search, PlusCircle, Bell } from "lucide-react";
import { Link } from "react-router";
import MAvatar from "./MAvatar";
export function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0   bg-background border-t sm:hidden">
      <NavigationMenu className="  w-full max-w-screen-sm ">
        <NavigationMenuList className="flex justify-between items-center p-2 max-w-full">
          <NavigationMenuItem > 
            <NavigationMenuLink asChild>
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <Home className="h-8 w-8" />
                  <span className="sr-only">Home</span>
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/search">
                <Button variant="ghost" size="icon">
                  <Search className="h-8 w-8" />
                  <span className="sr-only">Search</span>
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/post">
                <Button variant="ghost" size="icon">
                  <PlusCircle className="h-8 w-8" />
                  <span className="sr-only">Post</span>
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/notifications">
                <Button variant="ghost" size="icon">
                  <Bell className="h-8 w-8" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/profile">
                <Button variant="ghost" size="icon" aria-label="Profile">
                
                  <MAvatar src="https://github.com/shadcn.png" name="CN" className="h-7 w-7" />
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
