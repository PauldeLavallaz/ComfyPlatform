"use client";

import { GeneradorLujanTechDay } from "@/components/GeneradorLujanTechDay";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { Card } from "@/components/ui/card";
import { UserRuns } from "@/components/UserRuns";

export default function LujanTechDayPage() {
  const inputs = (
    <Card className="p-6">
      <GeneradorLujanTechDay />
    </Card>
  );

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Luján Tech Day</h1>
      <GeneratorLayout inputs={inputs}>
        <UserRuns deploymentId="4bec08ac-4e1b-4ada-bd79-19a1fab8158a" />
      </GeneratorLayout>
    </div>
  );
} 