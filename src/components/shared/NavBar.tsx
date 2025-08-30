import Logo from "@/components/shared/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/shared/MobileNav";
import { Search, Send } from "lucide-react";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import { memo, useCallback } from "react";
import { Link } from "react-router";
import { ModeToggle } from "@/components/ui/mode-toggle";
const NavBar = () => {
  const { logout } = useAuthStore();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);
  return (
    <>
      <nav className="bg-white dark:bg-[#0a0a0a] border  border-input ">
        <div className="flex items-center justify-between p-4">
          <Link to="/" aria-label="Home" title="Back to Home">
            <Logo />
          </Link>
          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 relative ">
            <Input
              placeholder="Search"
              aria-label="Search"
              className="h-10 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px]   pl-10 shadow-none focus-visible:ring-1 focus-visible:ring-[var(--primary-500)]"
            />

            <Search
              aria-label="Search"
              className="w-6 h-6 absolute left-2 top-1/2 -translate-y-1/2 text-[var(--neutral-500)]"
            />
          </div>
          <div className="flex items-center gap-1">  
            {/* Logout  */}
            <div className="hidden sm:flex items-center gap-1  ">
              <Button
                variant="ghost"
                className="h-10"
                aria-label="Logout"
                title="Logout"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
            {/* send icon */}
            <div className="flex sm:hidden items-center gap-1">
              <Link to="/messages">
                <Button
                  variant="ghost"
                  size={"icon"}
                  aria-label="Messages"
                  title="Go to messages"
                >
                  <Send className="h-6 w-6 text-[var(--neutral-500)] hover:text-[var(--primary-900)] animate-pulse" />
                </Button>
              </Link>
            </div>
            <ModeToggle />
          </div>
        </div>
      </nav>
      {/* Mobile nav */}
      <MobileNav />
    </>
  );
};

export default memo(NavBar);
