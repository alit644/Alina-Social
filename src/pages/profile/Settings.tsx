import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink, Outlet } from "react-router";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/Auth/useAuthStore";
const Settings = () => {
  const { logout } = useAuthStore();
  // handle logout
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="">
      <Card className="shadow-none rounded-md gap-0 p-0 ">
        <CardHeader className=" flex justify-start items-center py-4">
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col sm:flex-row gap-4 sm:gap-0  p-0">
          {/* Links */}
          <section className="flex flex-row  sm:flex-col  w-full sm:w-[150px] md:w-[180px] lg:w-[240px] border-b sm:border-r border-input">
            <div className="py-2">
              <Button
                variant="ghost"
                className="text-[var(--neutral-600)] w-full"
              >
                <NavLink
                  to={"/profile/settings"}
                  className={({ isActive }) =>
                    isActive ? "text-[var(--primary-900)] " : ""
                  }
                  end
                >
                  General
                </NavLink>
              </Button>
            </div>

            <div className="py-2">
              <Button
                variant="ghost"
                className="text-[var(--neutral-600)] w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </section>

          {/* Links content */}
          <section className="flex-1 py-2 px-4">
            <Outlet />
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
