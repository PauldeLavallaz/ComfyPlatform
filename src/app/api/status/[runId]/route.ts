import { db } from "@/db/db";
import { runs } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface RouteParams {
  params: {
    runId: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { runId } = params;
    const [run] = await db
      .select()
      .from(runs)
      .where(eq(runs.runId, runId))
      .limit(1);

    if (!run) {
      return NextResponse.json(
        { error: "Ejecución no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: run.liveStatus,
      image_url: run.imageUrl,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 