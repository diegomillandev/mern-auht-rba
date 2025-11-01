import { z } from "zod";
import { passwordSchema } from "../utils/validations.js";
import mongoose from "mongoose";

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

export const objectIdSchema = z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid MongoDB ObjectId",
    }),
});

export const updateProfileSchema = z.object({
    email: z.email({ message: "Please enter a valid email" }).optional(),
    username: z.string().min(1, { message: "Name is required" }).optional(),
});

export const updatePasswordSchema = z.object({
    current_password: z.string().min(1, { message: "Current password is required" }),
    new_password: passwordSchema,
    new_password_confirmation: z.string().min(1, { message: "Please confirm new password" }),
}).refine((data) => data.new_password === data.new_password_confirmation, {
    message: "New passwords do not match",
    path: ["confirm_new_password"],
});