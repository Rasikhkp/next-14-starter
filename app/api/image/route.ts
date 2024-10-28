import { formatDateToCustomString } from "@/lib/utils";
import { mkdir, unlink, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import mime from "mime";

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        console.log("file in api", file);

        if (!file || !(file instanceof File)) {
            return NextResponse.json({
                success: false,
                message: "file is required",
                data: null,
            });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadDir = join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });

        const timestamp = formatDateToCustomString(new Date());
        const extension = mime.getExtension(file.type);
        const fileName = `${timestamp}_${file.name || "upload"}`;
        const filePath = join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            message: "File uploaded successfully",
            data: "/uploads/" + fileName,
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        const { fileName } = await req.json();

        console.log("fileName", fileName);

        if (!fileName) {
            return NextResponse.json({
                success: false,
                message: "File name is required",
                data: null,
            });
        }

        const filePath = join(process.cwd(), "public", fileName);

        // Delete the file
        await unlink(filePath);

        return NextResponse.json({
            success: true,
            message: `File ${fileName} deleted successfully`,
            data: "/uploads/" + fileName,
        });
    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
};
