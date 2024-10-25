import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser, signUp, verifyUser } from "./actions/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
                name: {},
            },
            authorize: async (credentials) => {
                const isUserExist = await verifyUser(
                    credentials.email,
                    credentials.password
                );

                const user = await getUser(credentials.email);
                // return user object with their profile data
                return user;
            },
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl + "/protected";
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.id = token.id;
            }
            return session;
        },
    },
    secret: process.env.AUTH_SECRET!,
    session: {
        strategy: "jwt",
    },
});
