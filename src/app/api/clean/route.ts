import { db } from "@/db/db";
import { runs } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, or, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Eliminar runs sin imagen o en estado queued/error
    await db.delete(runs).where(
      and(
        eq(runs.userId, userId),
        isNull(runs.imageUrl),
        or(
          eq(runs.liveStatus, "queued"),
          eq(runs.liveStatus, "error")
        )
      )
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 