"use client";

import { GeneradorLujanTechDay } from "@/components/GeneradorLujanTechDay";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { Card } from "@/components/ui/card";
import { UserRuns } from "@/components/UserRuns";

export default function LujanTechDayPage() {
  const inputs = (
    <Card className="rounded-none border-0 p-4">
      <GeneradorLujanTechDay />
    </Card>
  );

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold px-6 py-2 border-b flex-none">
        Luján Tech
      </h1>
      <div className="flex-1 overflow-hidden">
        <GeneratorLayout inputs={inputs}>
          <UserRuns deploymentId="4bec08ac-4e1b-4ada-bd79-19a1fab8158a" />
        </GeneratorLayout>
      </div>
    </div>
  );
} 