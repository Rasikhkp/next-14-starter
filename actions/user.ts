"use server";

import { db } from "@/db";
import { User, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "./utils";
import { auth, signIn } from "@/auth";
import { SignInSchema, SignUpSchema } from "@/lib/zodSchema";
import { AuthError } from "next-auth";
import { z } from "zod";
import { redirect } from "next/dist/server/api-utils";

export const signInWrapper = async (data: SignInSchema) => {
    try {
        await signIn("credentials", data);

        return {
            success: true,
            message: "Sign in successfull",
            redirect: "",
        };
    } catch (error: any) {
        if (error.message === "NEXT_REDIRECT") {
            return {
                success: true,
                message: "Sign in successfull",
                redirect: error.digest.split(";")[2] as string,
            };
        }

        return {
            success: false,
            message: error.message.split(".")[0],
            redirect: "",
        };
    }
};

export const signUp = async ({ email, password, name }: SignUpSchema) => {
    try {
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (existingUser[0]) {
            return {
                success: false,
                message: "Email already exists",
            };
        }

        const hashedPassword = await hashPassword(password);

        if (!hashedPassword) {
            return {
                success: false,
                message: "Error hashing password",
            };
        }

        await db
            .insert(users)
            .values({ email, password: hashedPassword, name });
        return {
            success: true,
            message: "User registered successfully",
        };
    } catch (error: any) {
        console.error("Error during sign-up:", error.message);
        return {
            success: false,
            message: "An unexpected error occurred during sign-up",
        };
    }
};

export const verifyUser = async (email: string, password: string) => {
    try {
        if (!email || !password) {
            return {
                success: false,
                message: "Email and password are required",
            };
        }

        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (!user[0]) {
            return {
                success: false,
                message: "User not found",
            };
        }

        const hashedPassword = user[0].password;
        const isMatch = await verifyPassword(hashedPassword, password);

        if (!isMatch) {
            return {
                success: false,
                message: "Invalid password",
            };
        }

        return {
            success: true,
            message: "User verified successfully",
        };
    } catch (error: any) {
        console.error("Error during user verification:", error.message);
        return {
            success: false,
            message: "An unexpected error occurred during user verification",
        };
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.select().from(users).where(eq(users.id, id));

        if (!user[0]) {
            return {
                success: false,
                message: "User not found",
                data: null,
            };
        }

        return {
            success: true,
            message: "User retrieved successfully",
            data: user[0],
        };
    } catch (error: any) {
        console.error("Error during get user by ID:", error.message);
        return {
            success: false,
            message: "An unexpected error occurred during get user by ID",
            data: null,
        };
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (!user[0]) {
            return {
                success: false,
                message: "User not found",
                data: null,
            };
        }

        return {
            success: true,
            message: "User retrieved successfully",
            data: user[0],
        };
    } catch (error: any) {
        console.error("Error during get user by email:", error.message);
        return {
            success: false,
            message: "An unexpected error occurred while retrieving the user",
            data: null,
        };
    }
};

export const updateUser = async (userId: string, data: any) => {
    try {
        await db.update(users).set(data).where(eq(users.id, userId));
        return {
            success: true,
            message: "User updated successfully",
        };
    } catch (error: any) {
        console.error("Error during user update:", error.message);
        return {
            success: false,
            message: "An unexpected error occurred during user update",
        };
    }
};

export const getLoggedInUser = async () => {
    try {
        const session = await auth();

        if (!session) {
            return {
                success: false,
                message: "No active session",
                data: null,
            };
        }

        const user = await db
            .select()
            .from(users)
            .where(eq(users.id, session?.user!.id!));

        if (!user[0]) {
            return {
                success: false,
                message: "User not found",
                data: null,
            };
        }

        return {
            success: true,
            message: "User retrieved successfully",
            data: user[0],
        };
    } catch (error: any) {
        console.error("Error during get logged-in user:", error.message);
        return {
            success: false,
            message: "An unexpected error occurred during get logged-in user",
            data: null,
        };
    }
};
