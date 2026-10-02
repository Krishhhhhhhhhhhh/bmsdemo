import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { loadEnvFile } from "node:process";
import { resolve } from "node:path";


for (const envFile of [resolve(__dirname, "../.env"), resolve(process.cwd(), "../../packages/prisma/.env")]) {
	try {
		loadEnvFile(envFile);
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
			throw error;
		}
	}
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL is required to initialize Prisma.");
}

const adapter = new PrismaPg({ connectionString });

export const client = new PrismaClient({ adapter });

