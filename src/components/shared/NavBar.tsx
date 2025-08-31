import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/shared/MobileNav";
import {  Send } from "lucide-react";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import { memo, useCallback } from "react";
import { Link } from "react-router";
import { ModeToggle } from "@/components/ui/mode-toggle";
import SearchQuery from "@/components/SearchQuery";
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
          <SearchQuery />
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
