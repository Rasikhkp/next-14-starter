import React from "react";
import Navbar from "../_components/navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
    const loggedInUser = await auth();
    console.log("loggedInUser", loggedInUser);

    if (!loggedInUser) {
        redirect("/sign-in");
    }
    return (
        <>
            <Navbar />
            <div>protected</div>
        </>
    );
};

export default page;
