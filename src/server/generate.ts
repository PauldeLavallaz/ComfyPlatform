import { db } from "@/db/db";
import { runs } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function generate(prompt: string, endpoint: string, options: { height: number; width: number; lora?: string; batchSize?: number }) {
  const { userId } = auth();
  if (!userId) throw new Error("No autorizado");

  // Llamar a ComfyDeploy para iniciar la generación
  const response = await fetch("https://api.comfydeploy.com/api/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.COMFY_DEPLOY_API_KEY}`,
    },
    body: JSON.stringify({
      deployment_id: "e322689e-065a-4d33-aa6a-ee941803ca95",
      webhook: `${endpoint}/api/webhook`,
      inputs: {
        prompt,
        height: options.height,
        width: options.width,
        lora: options.lora || "",
        batch_size: options.batchSize || 1,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Error al iniciar la generación");
  }

  const result = await response.json();

  if (!result.runId) {
    throw new Error("No se recibió el ID de la ejecución");
  }

  // Guardar en la base de datos
  const [run] = await db.insert(runs).values({
    runId: result.runId,
    userId: userId,
    liveStatus: "queued",
    deploymentId: "e322689e-065a-4d33-aa6a-ee941803ca95",
    prompt: prompt,
  }).returning();

  return run;
}
  
  