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
      <div className="fixed top-0 left-0 right-0 z-20 bg-white">
        <div className="h-16" />
        <h1 className="text-2xl font-bold px-6 py-2 border-b flex-none md:ml-64 bg-white">
          Luján Tech
        </h1>
      </div>
      <div className="flex-1 overflow-hidden pt-[88px]">
        <GeneratorLayout inputs={inputs}>
          <UserRuns deploymentId="4bec08ac-4e1b-4ada-bd79-19a1fab8158a" />
        </GeneratorLayout>
      </div>
    </div>
  );
} 