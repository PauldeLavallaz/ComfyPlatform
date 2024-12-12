"use client";

import { GeneradorLujanTech } from "@/components/GeneradorLujanTech";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { Card } from "@/components/ui/card";
import { UserRuns } from "@/components/UserRuns";

export default function LujanTechPage() {
  const inputs = (
    <Card className="rounded-none border-0 p-4">
      <GeneradorLujanTech />
    </Card>
  );

  return (
    <div className="flex flex-col h-screen">
      <h1 className="fixed top-0 left-0 right-0 px-6 py-4 text-2xl font-bold z-10 bg-white">
        Luján Tech
      </h1>

      <div className="flex-1 overflow-hidden mt-16">
        <GeneratorLayout inputs={inputs}>
          <UserRuns deploymentId="4bec08ac-4e1b-4ada-bd79-19a1fab8158a" />
        </GeneratorLayout>
      </div>
    </div>
  );
} 