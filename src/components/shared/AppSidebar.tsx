import { SIDEBAR_ITEMS } from "@/data";
import MAvatar from "./MAvatar";
import { NavLink } from "react-router";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import { memo } from "react";
const AppSidebar = () => {
  const { userProfile } = useAuthStore();
  const sidebarItems = SIDEBAR_ITEMS.map((item) => {
    return (
      <li
        className="not-last:border-b border-input hover:bg-accent"
        key={item.id}
      >
        <NavLink
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-2 w-full px-5 p-3  ${
              isActive
                ? " bg-accent text-black dark:text-white rounded-md"
                : "text-[var(--neutral-500)] dark:text-[var(--neutral-400)] hover:text-black"
            }`
          }
          title={item.name}
          aria-label={item.name}
        >
          <item.icon className="h-5 w-5  " />
          <span className="text-md ">{item.name}</span>
        </NavLink>
      </li>
    );
  });
  return (
    <div className="bg-card  border hidden sm:block h-[calc(100vh-110px)]">
      {/* Profile Section */}
      <div>
        <section className="relative">
          <img
            loading="lazy"
            src="https://plus.unsplash.com/premium_photo-1670934158407-d2009128cb02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFubmVyfGVufDB8fDB8fHww"
            alt="banner image"
            title="banner image"
            className="w-full h-[100px] object-cover"
            aria-label="banner image"
          />
          <MAvatar
            src={`${userProfile?.avatar_url}`}
            name={userProfile?.username?.slice(0, 2).toUpperCase()}
            className="absolute bottom-[-20px] left-6 h-[50px] w-[50px]"
          />
        </section>
        <div className="text-start mt-2 p-4">
          <h3 className="H4 text-lg font-semibold">{userProfile?.full_name}</h3>
          <p className="text-sm text-muted-foreground">@{userProfile?.username}</p>
        </div>
      </div>

      <div className="my-4">
        <ul className="space-y-2">{sidebarItems}</ul>
      </div>
    </div>
  );
};
export default memo(AppSidebar);
