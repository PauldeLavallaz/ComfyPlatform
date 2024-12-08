import { db } from "@/db/db";
import { runs } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { ComfyDeploy } from "comfydeploy";

const cd = new ComfyDeploy({
  bearer: process.env.COMFY_DEPLOY_API_KEY!,
});

export async function generateFranatics(endpoint: string, inputs: any) {
  const { userId } = auth();
  if (!userId) throw new Error("User not found");

  try {
    const result = await cd.run.queue({
      deploymentId: "cec337bf-69d6-4886-97b0-acbeba47f1ec",
      webhook: `${endpoint}/api/webhook`,
      inputs: {
        img_face: inputs.img_face,
        txt_nacionalidad: inputs.txt_nacionalidad,
        txt_nombre: inputs.txt_nombre,
        num: inputs.num || 1,
        variedad: inputs.variedad,
        img_man: "",
        img_woman: "",
        depth_man: "",
        depth_woman: "",
        canny_man: "",
        canny_woman: ""
      }
    });

    if (!result?.runId) {
      throw new Error("No runId received from ComfyDeploy");
    }

    await db.insert(runs).values({
      runId: result.runId,
      userId: userId,
      liveStatus: "queued",
      deploymentId: "cec337bf-69d6-4886-97b0-acbeba47f1ec",
      prompt: JSON.stringify(inputs),
    });

    return result.runId;
  } catch (error) {
    console.error("Error calling ComfyDeploy API:", error);
    throw error;
  }
} 