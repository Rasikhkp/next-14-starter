import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { defineConfig } from "drizzle-kit";

console.log("Database URL:", process.env.DATABASE_URL);

export default defineConfig({
    dialect: "postgresql",
    schema: "./db/schema.ts",
    out: "./drizzle",

    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
