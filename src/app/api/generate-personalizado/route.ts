import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { runs } from "@/db/schema";
import { auth } from "@clerk/nextjs";

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { nombre, imagen, email } = body;

    // Llamar a ComfyDeploy
    const response = await fetch("https://api.comfydeploy.com/api/v1/runs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.COMFY_DEPLOY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deploymentId: "4bec08ac-4e1b-4ada-bd79-19a1fab8158a",
        inputs: {
          nombre,
          imagen,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Error al comunicarse con ComfyDeploy");
    }

    const data = await response.json();
    const runId = data.runId;

    // Guardar en la base de datos
    await db.insert(runs).values({
      run_id: runId,
      user_id: userId,
      live_status: "queued",
      progress: 0,
      deployment_id: "4bec08ac-4e1b-4ada-bd79-19a1fab8158a"
    });

    // Enviar datos a n8n
    await fetch("https://pauldelavallaz.app.n8n.cloud/webhook-test/5c01375c-2250-4258-ab88-b50fdf695999", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        runId,
      }),
    });

    return NextResponse.json({ runId });
  } catch (error) {
    console.error("Error in generate-personalizado:", error);
    return NextResponse.json(
      { error: "Error al generar la imagen" },
      { status: 500 }
    );
  }
} 