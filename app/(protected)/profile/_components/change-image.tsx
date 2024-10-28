"use client";
import { Camera } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

type Props = {
    register: UseFormRegister<{
        profilePicture: File;
        name: string;
        userId: string;
    }>;
    setValue: UseFormSetValue<{
        profilePicture: File;
        name: string;
        userId: string;
    }>;
    errors: FieldErrors<{
        profilePicture: File;
        name: string;
        userId: string;
    }>;
    src: string;
};
const ChangeImage = ({ setValue, register, errors, src }: Props) => {
    const [imagePreview, setImagePreview] = useState(src);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setValue("profilePicture", file, { shouldValidate: true });
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => document.getElementById("fileInput")?.click()}
                className="flex hover:bg-green-600 active:bg-green-700 transition-all justify-center absolute items-center size-10 rounded-full top-10 z-10 right-0 bg-green-500"
            >
                <Camera color="white" size={20} />
            </button>

            <input
                id="fileInput"
                {...register("profilePicture")}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />

            <div className="mt-10 border-2 border-neutral-400 size-40 rounded-full mx-auto relative overflow-hidden">
                <Image
                    src={imagePreview}
                    fill
                    className="object-cover"
                    alt="profile picture"
                />
            </div>
            {errors.profilePicture && (
                <div className="text-xs text-center mt-2 text-red-500">
                    {errors.profilePicture.message}
                </div>
            )}
        </div>
    );
};

export default ChangeImage;
