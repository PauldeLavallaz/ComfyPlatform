"use client";

import { GeneratorLayout } from "@/components/GeneratorLayout";
import { UserRuns } from "@/components/UserRuns";
import { GeneradorBasico } from "@/components/GeneradorBasico";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

export default function BasicGeneratorPage() {
  const inputs = (
    <Card className="rounded-none border-0 p-4">
      <GeneradorBasico />
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
      title="Generador Básico"
      action={generateButton}
    >
      <UserRuns />
    </GeneratorLayout>
  );
} 