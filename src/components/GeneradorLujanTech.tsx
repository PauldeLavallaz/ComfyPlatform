"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { CollapsibleGeneratorForm } from "@/components/CollapsibleGeneratorForm";

export function GeneradorLujanTech() {
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");
  const [email, setEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagen) {
      toast.error("Por favor carga una selfie");
      return;
    }

    if (!nombre || !email) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-personalizado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          imagen,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al generar la imagen");
      }

      toast.success("¡Generación iniciada!");
      mutate("userRuns");
      
      // Cerrar el formulario en móvil después de generar
      if (isMobile) {
        setIsFormOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <CollapsibleGeneratorForm 
      isOpen={isFormOpen}
      onOpenChange={setIsFormOpen}
    >
      // ... resto del componente ...
    </CollapsibleGeneratorForm>
  );
} 