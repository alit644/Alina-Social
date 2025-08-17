import Logo from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/MobileNav";
const NavBar = () => {
  return (
    <>
      <nav className="bg-white border  border-input ">
        <div className="flex items-center justify-between p-4">
          <Logo />
          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 relative ">
            <Input
              placeholder="Search"
              className="h-10 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px]   pl-10 shadow-none focus-visible:ring-1 focus-visible:ring-[var(--primary-500)]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="w-6 h-6 absolute left-2 top-1/2 -translate-y-1/2 text-[var(--neutral-500)]"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" x2="16.65" y1="21" y2="16.65" />
            </svg>
          </div>
          {/* Logout  */}
          <div className="hidden sm:flex items-center gap-1  ">
            <Button variant="ghost" className="h-10">
              Logout
            </Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className="main-grid-item-icon"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          {/* send icon */}
          <div className="flex sm:hidden items-center gap-1">
            <Button variant="ghost" size={"icon"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="main-grid-item-icon h-6 w-6 text-[var(--neutral-500)] hover:text-[var(--primary-900)] animate-pulse "
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <line x1="22" x2="11" y1="2" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </Button>
          </div>
        </div>
      </nav>
          {/* Mobile nav */}
          <MobileNav />
    </>
  );
};

export default NavBar;
