import {z} from "zod";

export const usernameValidation = z.string()
.min(3, { message: "Username must be at least 3 characters"})
.max(20, { message: "Username must be at most 20 characters" })
.regex(/^[a-zA-Z0-9_]+$/, { message: "Username must not contain any special characters except _"})

export const signUpSchema = z.object({
    username: usernameValidation,
    password: z.string().min(8, { message: "Password must be at least"}),
    email: z.string().email("Please enter a valid email address!")
})