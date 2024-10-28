import React, { useEffect, useState } from "react";
import BackButton from "./_components/back-button";
import ChangeImage from "./_components/change-image";
import SubmitButton from "./_components/submit-button";
import { Input } from "@/components/ui/input";
import { deleteFile, uploadFile } from "@/lib/utils";
import { getLoggedInUser, getUserById, updateUser } from "@/actions/user";
import { revalidatePath } from "next/cache";
import { useForm } from "react-hook-form";
import { updateProfileSchema, UpdateProfileSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/db/schema";
import UpdateProfileForm from "./_components/update-profile-form";

// const updateUserData = async (formData: FormData) => {
//     "use server";

//     const profilePicture = formData.get("profilePicture") as File;
//     const name = formData.get("name") as string;
//     const userId = formData.get("userId") as string;

//     let data = {};

//     if (profilePicture.size) {
//         const image = await uploadFile(profilePicture);
//         data = {
//             profilePicture: image.fileName,
//             name,
//         };

//         const { data: user } = await getUserById(userId);

//         if (user?.profilePicture) {
//             await deleteFile(user.profilePicture);
//         }
//     } else {
//         data = { name };
//     }

//     const res = await updateUser(userId, data);

//     revalidatePath("/profile");
// };

const page = async () => {
    const { data } = await getLoggedInUser();
    return (
        <div>
            <div className="w-full px-32 pt-32">
                <BackButton />
                <UpdateProfileForm loggedInUser={data!} />
            </div>
        </div>
    );
};

export default page;
