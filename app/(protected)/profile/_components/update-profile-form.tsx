// "use client";

// import React, { useEffect, useState } from "react";
// import ChangeImage from "./change-image";
// import { Input } from "@/components/ui/input";
// import { deleteFile, uploadFile, urlToFile } from "@/lib/utils";
// import { getLoggedInUser, getUserById, updateUser } from "@/actions/user";
// import { useForm } from "react-hook-form";
// import { updateProfileSchema, UpdateProfileSchema } from "@/lib/zodSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { User } from "@/db/schema";
// import { LoaderCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/hooks/use-toast";

// const IMAGE_PLACEHOLDER_NAME =
//     "Profile_avatar_placeholder_large.png?20150327203541";
// const IMAGE_PLACEHOLDER_URL =
//     "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

// const UpdateProfileForm = ({ loggedInUser }: { loggedInUser: User }) => {
//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: { errors, isSubmitting },
//     } = useForm<UpdateProfileSchema>({
//         resolver: zodResolver(updateProfileSchema),
//         defaultValues: {
//             name: loggedInUser.name,
//             userId: loggedInUser.id,
//         },
//     });

//     const onSubmit = async ({
//         profilePicture,
//         name,
//         userId,
//     }: UpdateProfileSchema) => {
//         let imageUrl = profilePicture.name;

//         if (imageUrl !== IMAGE_PLACEHOLDER_NAME) {
//             const { data } = await uploadFile(profilePicture);
//             imageUrl = data;
//             const { data: user } = await getUserById(userId);

//             if (
//                 user?.profilePicture &&
//                 user.profilePicture !== IMAGE_PLACEHOLDER_URL
//             ) {
//                 const res = await deleteFile(user.profilePicture);

//                 if (!res.success) {
//                     toast({
//                         title: "Error",
//                         description: res.message,
//                     });
//                     return;
//                 }
//             }
//         }

//         const res = await updateUser(userId, {
//             name,
//             profilePicture: imageUrl,
//         });

//         if (res.success) {
//             toast({
//                 title: "Success",
//                 description: res.message,
//             });
//         } else {
//             toast({
//                 title: "Error",
//                 description: res.message,
//             });
//         }
//     };

//     useEffect(() => {
//         (async () => {
//             const imageFile = await urlToFile(loggedInUser.profilePicture);

//             setValue("profilePicture", imageFile);
//         })();
//     }, []);

//     return (
//         <form
//             // action={updateUserData}
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex flex-col items-center"
//         >
//             <input type="hidden" {...register("userId")} />

//             <ChangeImage
//                 register={register}
//                 setValue={setValue}
//                 errors={errors}
//                 src={loggedInUser.profilePicture}
//             />
//             <Input
//                 type="text"
//                 {...register("name")}
//                 className="mt-5 w-80 border border-neutral-500 h-10"
//                 placeholder="Name"
//             />
//             {errors.name && (
//                 <div className="text-xs mt-2 text-red-500">
//                     {errors.name.message}
//                 </div>
//             )}

//             <Button type="submit" className={`mx-auto mt-5 w-20`}>
//                 {isSubmitting ? (
//                     <LoaderCircle
//                         size={20}
//                         color="white"
//                         className="animate-spin"
//                     />
//                 ) : (
//                     "Submit"
//                 )}
//             </Button>
//         </form>
//     );
// };

// export default UpdateProfileForm;

"use client";

import React, { useEffect } from "react";
import ChangeImage from "./change-image";
import { Input } from "@/components/ui/input";
import { deleteFile, uploadFile, urlToFile } from "@/lib/utils";
import { getUserById, updateUser } from "@/actions/user";
import { useForm } from "react-hook-form";
import { updateProfileSchema, UpdateProfileSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/db/schema";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const IMAGE_PLACEHOLDER_NAME =
    "Profile_avatar_placeholder_large.png?20150327203541";
const IMAGE_PLACEHOLDER_URL =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

const UpdateProfileForm = ({ loggedInUser }: { loggedInUser: User }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<UpdateProfileSchema>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: loggedInUser.name,
            userId: loggedInUser.id,
        },
    });

    const handleToast = (success: boolean, message: string) => {
        toast({
            title: success ? "Success" : "Error",
            description: message,
        });
    };

    const handleImageUploadAndDelete = async (
        profilePicture: File,
        userId: string
    ) => {
        let imageUrl = profilePicture.name;

        if (imageUrl !== IMAGE_PLACEHOLDER_NAME) {
            const { data: uploadedImageUrl } = await uploadFile(profilePicture);
            imageUrl = uploadedImageUrl;

            const { data: user } = await getUserById(userId);
            if (
                user?.profilePicture &&
                user.profilePicture !== IMAGE_PLACEHOLDER_URL
            ) {
                const res = await deleteFile(user.profilePicture);
                if (!res.success) return handleToast(false, res.message);
            }
        }

        return imageUrl;
    };

    const onSubmit = async ({
        profilePicture,
        name,
        userId,
    }: UpdateProfileSchema) => {
        const imageUrl = await handleImageUploadAndDelete(
            profilePicture,
            userId
        );
        const res = await updateUser(userId, {
            name,
            profilePicture: imageUrl,
        });

        handleToast(res.success, res.message);
    };

    useEffect(() => {
        urlToFile(loggedInUser.profilePicture).then((file) =>
            setValue("profilePicture", file)
        );
    }, []);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
        >
            <input type="hidden" {...register("userId")} />

            <ChangeImage
                register={register}
                setValue={setValue}
                errors={errors}
                src={loggedInUser.profilePicture}
            />
            <Input
                type="text"
                {...register("name")}
                className="mt-5 w-80 border border-neutral-500 h-10"
                placeholder="Name"
            />
            {errors.name && (
                <div className="text-xs mt-2 text-red-500">
                    {errors.name.message}
                </div>
            )}

            <Button type="submit" className="mx-auto mt-5 w-20">
                {isSubmitting ? (
                    <LoaderCircle
                        size={20}
                        color="white"
                        className="animate-spin"
                    />
                ) : (
                    "Submit"
                )}
            </Button>
        </form>
    );
};

export default UpdateProfileForm;
