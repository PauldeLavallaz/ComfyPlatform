import { db } from "@/db/db";
import { runs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const runId = data.run_id;

    if (!runId) {
      return NextResponse.json({ error: "Run ID is required" }, { status: 400 });
    }

    // Actualizar el estado en la base de datos
    const updates: {
      liveStatus: string;
      imageUrl?: string;
    } = {
      liveStatus: data.status,
    };

    if (data.outputs?.[0]?.data?.images?.[0]?.url) {
      updates.imageUrl = data.outputs[0].data.images[0].url;
    }

    await db
      .update(runs)
      .set(updates)
      .where(eq(runs.runId, runId));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
