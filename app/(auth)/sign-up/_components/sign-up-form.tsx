"use client";

import {
    SignInSchema,
    signInSchema,
    signUpSchema,
    SignUpSchema,
} from "@/lib/zodSchema";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWrapper, signUp } from "@/actions/user";
import Link from "next/link";
import { Check, LoaderCircle, RocketIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });
    const router = useRouter();
    const [alert, setAlert] = useState({
        success: false,
        description: "",
    });

    const onSubmit = async (data: SignUpSchema) => {
        const res = await signUp(data);

        console.log("res", res);
        if (!res.success) {
            setAlert({
                success: false,
                description: res.message,
            });
        } else {
            setAlert({
                success: true,
                description: res.message,
            });

            router.push("/sign-in");
        }
    };

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert({
                    success: false,
                    description: "",
                });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [alert]);
    return (
        <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            {alert.description && (
                <Alert variant={alert.success ? "default" : "destructive"}>
                    {alert.success ? (
                        <Check className="size-4" />
                    ) : (
                        <ExclamationTriangleIcon className="h-4 w-4" />
                    )}

                    <AlertTitle>
                        {alert.success ? "Success" : "Error"}
                    </AlertTitle>
                    <AlertDescription>{alert.description}</AlertDescription>
                </Alert>
            )}
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Name
                </label>
                <input
                    type="text"
                    {...register("name")}
                    id="email"
                    className={`bg-gray-50 border text-sm ${
                        errors.name
                            ? "border-red-500"
                            : "border-gray-300 focus:ring-gray-400 focus:ring-offset-1 focus:ring-2"
                    } text-gray-900 outline-none rounded-lg block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="name@company.com"
                />
                {errors.name && (
                    <div className="text-xs mt-1 text-red-500">
                        {errors.name.message}
                    </div>
                )}
            </div>
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your email
                </label>
                <input
                    type="email"
                    {...register("email")}
                    id="email"
                    className={`bg-gray-50 border text-sm ${
                        errors.email
                            ? "border-red-500"
                            : "border-gray-300 focus:ring-gray-400 focus:ring-offset-1 focus:ring-2"
                    } text-gray-900 outline-none rounded-lg block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="name@company.com"
                />
                {errors.email && (
                    <div className="text-xs mt-1 text-red-500">
                        {errors.email.message}
                    </div>
                )}
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Password
                </label>
                <input
                    type="password"
                    {...register("password")}
                    id="password"
                    placeholder="••••••••"
                    className={`bg-gray-50 border text-sm ${
                        errors.password
                            ? "border-red-500"
                            : "border-gray-300 focus:ring-gray-400 focus:ring-offset-1 focus:ring-2"
                    } text-gray-900 outline-none rounded-lg block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                />
                {errors.password && (
                    <div className="text-xs mt-1 text-red-500">
                        {errors.password.message}
                    </div>
                )}
            </div>
            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex-1  text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                    {isSubmitting ? (
                        <LoaderCircle
                            size={20}
                            className="animate-spin mx-auto"
                        />
                    ) : (
                        "Sign in"
                    )}
                </button>
            </div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                    href="/sign-in"
                    className="font-medium text-gray-600 hover:underline dark:text-gray-500"
                >
                    Sign In
                </Link>
            </p>
        </form>
    );
};

export default SignUpForm;
