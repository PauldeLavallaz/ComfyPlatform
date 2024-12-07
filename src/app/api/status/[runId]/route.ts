import { db } from "@/db/db";
import { runs } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    runId: string;
  };
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { runId } = params;
    const [run] = await db
      .select()
      .from(runs)
      .where(eq(runs.runId, runId))
      .limit(1);

    if (!run) {
      return new Response(JSON.stringify({ error: "Ejecución no encontrada" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      status: run.liveStatus,
      image_url: run.imageUrl,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 