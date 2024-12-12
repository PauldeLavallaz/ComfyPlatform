"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

interface GeneradorLujanTechProps {
  onGenerate?: () => void;
}

export function GeneradorLujanTech({ onGenerate }: GeneradorLujanTechProps) {
  const [formData, setFormData] = useState({
    prompt: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!formData.prompt.trim()) {
      toast.error("Por favor ingresa un prompt");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          deploymentId: "4bec08ac-4e1b-4ada-bd79-19a1fab8158a"
        }),
      });

      const result = await response.json();
      if (response.ok && result.run_id) {
        toast.success("¡Generación iniciada!");
        mutate("userRuns");
        onGenerate?.(); // Cerrar el sheet en mobile después de generar
      } else {
        toast.error(result.error || "Error al generar la imagen");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al generar la imagen");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="prompt">Prompt</Label>
        <Input 
          id="prompt"
          value={formData.prompt}
          onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
          placeholder="Describe lo que quieres generar..."
        />
      </div>
      <Button 
        className="w-full" 
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? "Generando..." : "Generar"}
      </Button>
    </div>
  );
} 