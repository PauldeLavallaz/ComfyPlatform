"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { toast } from "sonner";
import { mutate } from "swr";

interface GeneradorLujanTechProps {
  onGenerate?: () => void;
}

export function GeneradorLujanTech({ onGenerate }: GeneradorLujanTechProps) {
  const [formData, setFormData] = useState({
    imagen: "",
    nombre: "",
    email: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!formData.imagen) {
      toast.error("Por favor carga una selfie");
      return;
    }

    if (!formData.nombre || !formData.email) {
      toast.error("Por favor completa todos los campos");
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
        onGenerate?.(); // Cerrar el sheet en mobile
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
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Tu Selfie</Label>
        <ImageUpload
          value={formData.imagen}
          onChange={(url) => setFormData(prev => ({ ...prev, imagen: url }))}
          accept="image/*"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input 
          id="nombre"
          value={formData.nombre}
          onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
          placeholder="Tu nombre completo"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="tu@email.com"
          inputMode="email"
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