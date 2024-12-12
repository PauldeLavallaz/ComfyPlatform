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
      <div className="flex-none bg-white">
        <div className="pt-20">
          <h1 className="px-6 py-4 text-2xl font-bold">
            Luján Tech
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <GeneratorLayout inputs={inputs}>
          <div className="pt-4">
            <UserRuns deploymentId="4bec08ac-4e1b-4ada-bd79-19a1fab8158a" />
          </div>
        </GeneratorLayout>
      </div>
    </div>
  );
} 