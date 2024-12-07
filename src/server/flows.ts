import { db } from "@/db";
import { flows, flowFields } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";
import { writeFile } from "fs/promises";
import { join } from "path";

interface FlowField {
  name: string;
  type: "text" | "number" | "select" | "image";
  label: string;
  placeholder?: string;
  defaultValue?: string | number;
  options?: { label: string; value: string }[];
}

interface Flow {
  name: string;
  description: string;
  deploymentId: string;
  route: string;
  icon: string;
  fields: FlowField[];
}

export async function createFlow(flowData: Flow) {
  const { userId } = auth();
  if (!userId) throw new Error("No autorizado");

  // 1. Guardar el flujo en la base de datos
  const [flow] = await db.insert(flows).values({
    userId,
    name: flowData.name,
    description: flowData.description,
    deploymentId: flowData.deploymentId,
    route: flowData.route,
    icon: flowData.icon,
  }).returning();

  // 2. Guardar los campos del flujo
  await Promise.all(flowData.fields.map((field, index) => 
    db.insert(flowFields).values({
      flowId: flow.id,
      name: field.name,
      type: field.type,
      label: field.label,
      placeholder: field.placeholder,
      defaultValue: field.defaultValue?.toString(),
      options: field.options ? JSON.stringify(field.options) : null,
      order: index,
    })
  ));

  // 3. Generar el archivo del componente
  await generateFlowComponent(flowData);

  return flow;
}

export async function getUserFlows() {
  const { userId } = auth();
  if (!userId) throw new Error("No autorizado");

  const userFlows = await db.query.flows.findMany({
    where: eq(flows.userId, userId),
    with: {
      fields: {
        orderBy: flowFields.order,
      },
    },
  });

  return userFlows.map(flow => ({
    ...flow,
    fields: flow.fields.map(field => ({
      ...field,
      options: field.options ? JSON.parse(field.options) : undefined,
    })),
  }));
}

export async function updateFlow(flowId: string, flowData: Flow) {
  const { userId } = auth();
  if (!userId) throw new Error("No autorizado");

  // Verificar que el flujo pertenece al usuario
  const existingFlow = await db.query.flows.findFirst({
    where: eq(flows.id, flowId),
  });

  if (!existingFlow || existingFlow.userId !== userId) {
    throw new Error("No autorizado");
  }

  // 1. Actualizar el flujo
  await db.update(flows)
    .set({
      name: flowData.name,
      description: flowData.description,
      deploymentId: flowData.deploymentId,
      route: flowData.route,
      icon: flowData.icon,
      updatedAt: new Date(),
    })
    .where(eq(flows.id, flowId));

  // 2. Eliminar campos existentes
  await db.delete(flowFields)
    .where(eq(flowFields.flowId, flowId));

  // 3. Insertar nuevos campos
  await Promise.all(flowData.fields.map((field, index) => 
    db.insert(flowFields).values({
      flowId,
      name: field.name,
      type: field.type,
      label: field.label,
      placeholder: field.placeholder,
      defaultValue: field.defaultValue?.toString(),
      options: field.options ? JSON.stringify(field.options) : null,
      order: index,
    })
  ));

  // 4. Regenerar el componente
  await generateFlowComponent(flowData);
}

export async function deleteFlow(flowId: string) {
  const { userId } = auth();
  if (!userId) throw new Error("No autorizado");

  // Verificar que el flujo pertenece al usuario
  const existingFlow = await db.query.flows.findFirst({
    where: eq(flows.id, flowId),
  });

  if (!existingFlow || existingFlow.userId !== userId) {
    throw new Error("No autorizado");
  }

  // Eliminar el flujo (los campos se eliminarán automáticamente por la restricción ON DELETE CASCADE)
  await db.delete(flows)
    .where(eq(flows.id, flowId));

  // TODO: Eliminar el archivo del componente (opcional, ya que se puede mantener para referencia)
}

async function generateFlowComponent(flowData: Flow) {
  const componentPath = join(process.cwd(), 'src/app/generator', flowData.route, 'page.tsx');
  
  const componentCode = `"use client";

import { DynamicGenerator } from "@/components/DynamicGenerator";

const flow = ${JSON.stringify(flowData, null, 2)};

export default function ${flowData.name.replace(/\s+/g, '')}Generator() {
  return <DynamicGenerator flow={flow} />;
}`;

  await writeFile(componentPath, componentCode, 'utf-8');
} 