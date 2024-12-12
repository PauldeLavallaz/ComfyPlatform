import { GeneradorLujanTechDay } from "@/components/GeneradorLujanTechDay";
import { GeneratorLayout } from "@/components/GeneratorLayout";

export default function LujanTechDayPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Luján Tech Day</h1>
      <GeneratorLayout>
        <GeneradorLujanTechDay />
      </GeneratorLayout>
    </div>
  );
} 