"use server";

import argon2 from "argon2";

export const hashPassword = async (password: string) => {
    try {
        const hash = await argon2.hash(password);

        return hash;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error hashing password :", error);
        } else {
            console.error("Unknown error during password hashing");
        }

        return null;
    }
};

export const verifyPassword = async (
    hashedPassword: string,
    password: string
) => {
    try {
        const isValid = await argon2.verify(hashedPassword, password);

        return isValid;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error verifying password :", error);
        } else {
            console.error("Unknown error during password verification");
        }

        return false;
    }
};
