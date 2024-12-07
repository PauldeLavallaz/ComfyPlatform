"use server";

import { db } from "@/db/db";
import { runs } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

export async function getUserRuns() {
	const { userId } = auth();
	if (!userId) throw new Error("No autorizado");

	const userRuns = await db
		.select()
		.from(runs)
		.where(eq(runs.userId, userId))
		.orderBy(desc(runs.createdAt));

	return userRuns;
}
