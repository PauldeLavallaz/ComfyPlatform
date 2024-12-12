"use client";

import { GeneradorLujanTech } from "@/components/GeneradorLujanTech";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { Card } from "@/components/ui/card";
import { UserRuns } from "@/components/UserRuns";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function LujanTechPage() {
  const [isOpen, setIsOpen] = useState(false);

  const inputs = (
    <Card className="rounded-none border-0 p-4">
      <GeneradorLujanTech onGenerate={() => setIsOpen(false)} />
    </Card>
  );

  const generateButton = (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2 md:hidden">
          <Wand2 className="w-4 h-4" />
          Generar
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0">
        {inputs}
      </SheetContent>
    </Sheet>
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