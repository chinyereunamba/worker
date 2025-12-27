// src/db.ts (or wherever this is)
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import "dotenv/config";

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url) {
  throw new Error("DATABASE_URL is missing or empty");
}

if (!authToken) {
  throw new Error("DATABASE_AUTH_TOKEN is missing or empty");
}

console.log("✅ Database connection initialized");
console.log("DB URL:", url.substring(0, 30) + "..."); // Partial log for safety

const client = createClient({
  url: url.trim(),
  authToken: authToken.trim(),
});

const db = drizzle({ client });

export { db };
