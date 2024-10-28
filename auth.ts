import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail, signUp, verifyUser } from "./actions/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
                name: {},
            },
            authorize: async (credentials) => {
                console.log("authorize");
                const isUserExist = await verifyUser(
                    credentials.email as string,
                    credentials.password as string
                );

                if (!isUserExist.success) {
                    throw new CredentialsSignin(isUserExist.message);
                }

                const data = await getUserByEmail(credentials.email as string);
                return data.data;
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
