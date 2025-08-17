import NavBar from "@/components/shared/NavBar";
import { Outlet } from "react-router";
import AppSidebar from "@/components/shared/AppSidebar";

const RootLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="container grid grid-cols-12 items-center gap-[40px] px-[12px] mx-auto bg-[#FBFBFB]">
       <div className="col-span-3 mt-6">
          <AppSidebar />
       </div>
       <div className="col-span-9 mt-6">
        <Outlet />
       </div>
      </div>
    </div>
  );
};

export default RootLayout;
