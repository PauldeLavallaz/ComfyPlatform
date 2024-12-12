"use client";

import { GeneratorLayout } from "@/components/GeneratorLayout";
import { UserRuns } from "@/components/UserRuns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function BasicGeneratorPage() {
  const [prompt, setPrompt] = useState("");

  const inputs = (
    <Card className="rounded-none border-0 p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">Prompt</Label>
          <Input 
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe lo que quieres generar..."
          />
        </div>
        <Button className="w-full">
          Generar
        </Button>
      </div>
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