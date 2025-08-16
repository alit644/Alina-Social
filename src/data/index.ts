import type { ILoginInput } from "@/interfaces";

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

export const REGISTER_INPUST: ILoginInput[] = [
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