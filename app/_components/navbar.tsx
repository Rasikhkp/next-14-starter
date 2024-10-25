import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";

const Navbar = async () => {
    const loggedInUser = await auth();
    return (
        <div className="py-3 w-full px-10 flex justify-end">
            {loggedInUser ? (
                <Popover>
                    <PopoverTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] rounded-xl p-2 text-sm">
                        <Link
                            href={"/profile"}
                            className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-neutral-200"
                        >
                            <User className="size-4 text-neutral-700" />
                            Profile
                        </Link>

                        <form
                            action={async () => {
                                "use server";
                                await signOut();
                            }}
                        >
                            <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-neutral-200">
                                <LogOut className="size-4 text-neutral-700" />
                                Logout
                            </button>
                        </form>
                    </PopoverContent>
                </Popover>
            ) : (
                <Link href="/sign-in">
                    <Button>Sign In</Button>
                </Link>
            )}
        </div>
    );
};

export default Navbar;
