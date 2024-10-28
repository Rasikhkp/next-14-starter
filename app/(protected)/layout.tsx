import { getLoggedInUser } from "@/actions/user";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { data: loggedInUser } = await getLoggedInUser();
    if (!loggedInUser) {
        redirect("/sign-in");
    }
    return <>{children}</>;
};

export default Layout;
