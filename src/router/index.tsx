import { createBrowserRouter } from "react-router";
import Home from "@/pages/Home";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
   path:"/login",
   Component: Login,
  },
  {
    path:"/register",
    Component: Register,
   }
]);
