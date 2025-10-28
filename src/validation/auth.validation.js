import { z } from "zod";

export const registerValidate = z.object({
  name: z.string().min(2),
  phone: z.string().min(9),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "manager", "staff", "customer", "user"]).optional(),
});

export const loginValidate = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "manager", "staff", "customer", "user"]),
});

export const refreshValidate = z.object({
  refreshToken: z.string().min(10),
});
