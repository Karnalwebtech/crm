import { z } from "zod";

export const login_schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).trim().toLowerCase(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

export const sign_up_schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).trim().toLowerCase(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    name: z.string(),
})

export const forgot_password_schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).trim().toLowerCase(),
})