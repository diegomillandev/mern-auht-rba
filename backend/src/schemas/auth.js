import { z } from "zod";
import { passwordSchema } from "../utils/validations.js";

export const registerSchema = z.object({
    username: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Please enter a valid email" }),
    password: passwordSchema,
    password_confirmation: z.string().min(1, { message: "Please confirm password" }),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
});

export const loginSchema = z.object({
    email: z.email({ message: "Please enter a valid email" }),
    password: z.string().min(1, { message: "Password is required" }),
});