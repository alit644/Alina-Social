import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
  email: z.string().email({
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .regex(/^[a-zA-Z0-9_.]+$/, {
      message:
        "Username can only contain letters, numbers, underscores, and dots",
    })
    .refine((val) => !val.startsWith(".") && !val.endsWith("."), {
      message: "Username cannot start or end with a dot",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
});

export const profileSchema = z.object({
  full_name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .regex(/^[a-zA-Z0-9_.]+$/, {
      message:
        "Username can only contain letters, numbers, underscores, and dots",
    })
    .refine((val) => !val.startsWith(".") && !val.endsWith("."), {
      message: "Username cannot start or end with a dot",
    }),
  bio: z
    .string()
    .min(3, { message: "Bio must be at least 3 characters long" })
    .max(200, { message: "Bio must be at most 200 characters long" }),
  avatar_url: z.union([z.instanceof(File), z.string()]).optional(),
});

export const addPostSchema = z.object({
  postContent: z
    .string()
    .min(5, { message: "Post must be at least 5 characters long" })
    .max(300, { message: "Post must be at most 200 characters long" }),
  postImage: z.union([z.instanceof(File), z.string()]).optional(),
});
