import { Link } from "react-router";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { SIDEBAR_ITEMS } from "@/data";

const AppSidebar = () => {
  const sidebarItems = SIDEBAR_ITEMS.map((item) => {
    return (
      <SidebarMenuItem key={item.id} className="not-last:border-b border-input p-2">
        <SidebarMenuButton asChild>
          <Link
            to={item.to}
            className="flex items-center flex-row gap-2 w-full"
          >
            <item.icon className="h-5 w-5" color="black" />
            <span className="text-md text-[var(--neutral-900)]">
              {item.name}
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  });
  return (
    <div className="w-[200px] md:w-[290px] h-[434px]  border border-input hidden sm:block">
      {/* Profile Section */}
      <div className=" ">
        <section className="relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1670934158407-d2009128cb02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFubmVyfGVufDB8fDB8fHww"
            alt="banner"
            className="w-full h-[100px] object-cover"
            aria-label="banner"
          />
          <Avatar className="h-[50px] w-[50px] absolute bottom-[-20px] left-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </section>
        <div className="text-start mt-2 p-4">
          <h3 className="text-lg font-semibold">Robert Fox</h3>
          <p className="text-sm text-gray-500">Software Engineer</p>
        </div>
      </div>
      <SidebarProvider className="">
        <SidebarMenu className=" h-fit px-4">
          {sidebarItems}
        </SidebarMenu>
      </SidebarProvider>
    </div>
  );
};
export default AppSidebar;
