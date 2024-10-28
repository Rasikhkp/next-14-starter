import { sql } from "drizzle-orm";
import {
    varchar,
    integer,
    pgTable,
    text,
    uuid,
    serial,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid().defaultRandom().notNull(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    profilePicture: text()
        .default(
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
        )
        .notNull(),
});

export type User = typeof users.$inferSelect;
