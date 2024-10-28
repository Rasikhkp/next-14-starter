import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const uploadFile = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch("/api/image", {
        method: "POST",
        body: formData,
    });

    const data = await res.json();

    return data;
};

export const deleteFile = async (fileName: string) => {
    const res = await fetch("/api/image", {
        method: "DELETE",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify({
            fileName,
        }),
    });

    const data = await res.json();

    console.log("data", data);
    return data;
};

export const formatDateToCustomString = (date: Date) => {
    const pad = (num: number) => num.toString().padStart(2, "0");

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are zero-based in JavaScript
    const year = date.getFullYear();
    const seconds = pad(date.getSeconds());
    const minutes = pad(date.getMinutes());
    const hours = pad(date.getHours());

    return `${day}_${month}_${year}_${seconds}_${minutes}_${hours}`;
};

export const urlToFile = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const mimeType = blob.type;
    const filename = url.split("/").pop() || "downloaded_image";

    return new File([blob], filename, { type: mimeType });
};
