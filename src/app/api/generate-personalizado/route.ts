import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { runs } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { ComfyDeploy } from "comfydeploy";

const cd = new ComfyDeploy({
  bearer: process.env.COMFY_DEPLOY_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error("User not found");

    const body = await request.json();
    const { nombre, imagen, email } = body;

    // Generar imagen con ComfyDeploy
    const result = await cd.run.queue({
      deploymentId: "4bec08ac-4e1b-4ada-bd79-19a1fab8158a",
      webhook: `${request.nextUrl.origin}/api/webhook`,
      inputs: {
        imagen,
        nombre
      }
    });

    if (!result?.runId) {
      throw new Error("No runId received from ComfyDeploy");
    }

    // Guardar en la base de datos
    await db.insert(runs).values({
      run_id: result.runId,
      user_id: userId,
      live_status: "queued",
      deployment_id: "4bec08ac-4e1b-4ada-bd79-19a1fab8158a",
      inputs: {
        nombre,
        imagen,
        email
      }
    });

    // Enviar datos a n8n
    try {
      const webhookResponse = await fetch(
        "https://pauldelavallaz.app.n8n.cloud/webhook/5c01375c-2250-4258-ab88-b50fdf695999",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            runId: result.runId,
            nombre
          }),
        }
      );

      if (!webhookResponse.ok) {
        console.error("Error al enviar datos a n8n:", await webhookResponse.text());
      }
    } catch (webhookError) {
      console.error("Error enviando a n8n:", webhookError);
    }

    return NextResponse.json({ runId: result.runId });
  } catch (error) {
    console.error("Error in generate-personalizado:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al generar la imagen" },
      { status: 500 }
    );
  }
} 