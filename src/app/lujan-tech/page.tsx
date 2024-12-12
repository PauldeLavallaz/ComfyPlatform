"use client";

import { GeneradorLujanTechDay } from "@/components/GeneradorLujanTechDay";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { Card } from "@/components/ui/card";
import { UserRuns } from "@/components/UserRuns";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

export default function LujanTechDayPage() {
  const inputs = (
    <Card className="rounded-none border-0 p-4">
      <GeneradorLujanTechDay />
    </Card>
  );

  const generateButton = (
    <Button className="gap-2">
      <Wand2 className="w-4 h-4" />
      Generar
    </Button>
  );

  return (
    <GeneratorLayout 
      inputs={inputs}
      title="Luján Tech"
      action={generateButton}
    >
      <UserRuns deploymentId="4bec08ac-4e1b-4ada-bd79-19a1fab8158a" />
    </GeneratorLayout>
  );
} 