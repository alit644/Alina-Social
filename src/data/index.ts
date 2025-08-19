import type { ILoginInput, IRegisterInput } from "@/interfaces";
import { Bell, Bookmark, Home, LayoutGrid, Send, Settings, User } from "lucide-react";

export const LOGIN_INPUTS: ILoginInput[] = [
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Email",
    validation: {
      required: "Email is required",
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Password",
    validation: {
      required: "Password is required",
      min: 6,
      max: 20,
    },
  },
];

export const REGISTER_INPUST: IRegisterInput[] = [
 {
  id: "name",
  name: "name",
  type: "text",
  placeholder: "Name",
  validation: {
    required: "Name is required",
    min: 3,
    max: 20,
  },
 },
 {
  id: "email",
  name: "email",
  type: "email",
  placeholder: "Email",
  validation: {
    required: "Email is required",
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
 },
 {
  id: "username",
  name: "username",
  type: "text",
  placeholder: "Username",
  validation: {
    required: "Username is required",
    min: 3,
    max: 20,
    pattern: /^[^@]+$/i,
  },
 },
 {
  id: "password",
  name: "password",
  type: "password",
  placeholder: "Password",
  validation: {
    required: "Password is required",
    min: 6,
    max: 20,
  },
 }
]

export const GENERAL_INPUTS = [
 {
   id: "fullname",
   name: "fullname",
   type: "text",
   placeholder: "Full Name",
   validation: {
     required: "Full name is required",
     min: 3,
     max: 20,

   },
 },
 {
   id: "username",
   name: "username",
   type: "text",
   placeholder: "User name",
   validation: {
     required: "User name is required",
     min: 4,
     max: 20,
     pattern: /^[^@]+$/i,
   },
 },
];


export const SIDEBAR_ITEMS = [
  {
    id: "home",
    name: "Home",
    icon: Home,
    to: "/",
  },
  {
    id: "profile",
    name: "Profile",
    icon: User,
    to: "/profile",
  },
  {
    id: "messages",
    name: "Messages",
    icon: Send,
    to: "/messages",
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: Bell,
    to: "/notifications",
  },
]

export const PROFILE_ITEMS = [
  {
    id: "posts",
    name: "My Posts",
    icon: LayoutGrid,
    to: "/profile",
  },
  {
    id: "saved",
    name: "Saved Posts",
    icon: Bookmark,
    to: "/profile/saved-post",
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    to: "/profile/settings",
  },
]