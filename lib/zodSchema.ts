import { z } from "zod";

const fileSchema = z
    .custom<File>((file) => file instanceof File && file.size > 0, {
        message: "File is required",
    })
    .refine((file) => file.type.startsWith("image/"), {
        message: "Only image files are allowed",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
        // 5 MB limit
        message: "File size must be less than 5MB",
    });

export const signUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(100, { message: "Name must be less than 100 characters" }),
});

export const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
});

export const updateProfileSchema = z.object({
    profilePicture: fileSchema,
    name: z.string().min(1, { message: "Name is required" }),
    userId: z.string().min(1),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
