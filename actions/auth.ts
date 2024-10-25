"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "./utils";
import { signOut } from "@/auth";

export const signUp = async (email: string, password: string, name: string) => {
    try {
        if (!email || !password) {
            throw new Error("Email and password are required.");
        }

        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (existingUser[0]) {
            throw new Error("Email already exists.");
        }

        const hashedPassword = await hashPassword(password);

        if (!hashedPassword) {
            return;
        }

        await db
            .insert(users)
            .values({ email, password: hashedPassword, name });
    } catch (error) {
        console.error("Error during sign up :", error.message);
        throw new Error("An unexpected error during sign up");
    }
};

export const verifyUser = async (email: string, password: string) => {
    try {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (!user[0]) {
            throw new Error("User not found");
        }

        const hashedPassword = user[0].password;

        const isMatch = await verifyPassword(hashedPassword, password);

        if (!isMatch) {
            throw new Error("Invalid password");
        }

        return true;
    } catch (error) {
        console.error("Error during user verification :", error.message);
        throw new Error(
            "An unexpected error occurred during user verification"
        );
    }
};

export const getUser = async (email: string) => {
    try {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (!user[0]) {
            throw new Error("User not found");
        }

        return user[0];
    } catch (error) {
        console.error("Error during get user :", error.message);
        throw new Error("An unexpected error occurred during get user");
    }
};

export const signOutWrapper = async () => {
    await signOut({ redirectTo: "/" });
};
