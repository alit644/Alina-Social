import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "react-router";
import { Outlet } from "react-router";
import { Separator } from "@/components/ui/separator";
import MAvatar from "@/components/shared/MAvatar";
import { Badge } from "@/components/ui/badge";
const Index = () => {
  return (
    <section>
      <Card className="shadow-none rounded-md gap-0 p-0 ">
        <CardHeader className=" flex justify-start items-center py-4">
          <CardTitle>Settings</CardTitle>
          <Badge variant="outline" className="ml-auto">
            Online
          </Badge>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col sm:flex-row gap-4 sm:gap-0  p-0">
          {/* Links */}
          <section className="flex flex-row  sm:flex-col  w-full sm:w-[150px] md:w-[180px] lg:w-[240px] border-b sm:border-r border-input">
            <div className="py-2 px-4">
              <NavLink to={"/profile/settings"} end>
                <div className={`flex items-center gap-2 relative`}>
                  <MAvatar
                    src="https://github.com/shadcn.png"
                    name="salman"
                    className="size-[50px]"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">salman</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </p>
                  </div>
                  <div className="size-2.5 rounded-full bg-[var(--success-500)] absolute left-10 bottom-1" />
                </div>
              </NavLink>
            </div>
          </section>

          {/* Links content */}
          <section className="flex-1 py-2 px-4">
            <Outlet />
          </section>
        </CardContent>
      </Card>
    </section>
  );
};

export default Index;
