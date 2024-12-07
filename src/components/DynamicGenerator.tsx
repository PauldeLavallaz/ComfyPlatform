"use client";

import { useState } from "react";
import { GeneratorLayout } from "./GeneratorLayout";
import { UserRuns } from "./UserRuns";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { CollapsibleGeneratorForm } from "./CollapsibleGeneratorForm";
import { ImageUpload } from "./ImageUpload";
import { toast } from "sonner";
import { mutate } from "swr";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface FlowField {
  name: string;
  type: "text" | "number" | "select" | "image";
  label: string;
  placeholder?: string;
  defaultValue?: string | number;
  options?: { label: string; value: string }[];
}

interface Flow {
  id: string;
  name: string;
  description: string;
  deploymentId: string;
  fields: FlowField[];
}

interface DynamicGeneratorProps {
  flow: Flow;
}

export function DynamicGenerator({ flow }: DynamicGeneratorProps) {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    // Inicializar el formData con los valores por defecto de los campos
    const initialData: Record<string, any> = {};
    flow.fields.forEach(field => {
      initialData[field.name] = field.defaultValue || "";
    });
    return initialData;
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    // Validar que todos los campos requeridos estén completos
    const missingFields = flow.fields.filter(field => !formData[field.name]);
    if (missingFields.length > 0) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deploymentId: flow.deploymentId,
          ...formData
        }),
      });

      const result = await response.json();
      if (response.ok && result.run_id) {
        toast.success("¡Generación iniciada!");
        mutate("userRuns");
      } else {
        console.error("Generation failed:", result);
        toast.error(result.error || "Error al generar");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al generar");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderField = (field: FlowField) => {
    switch (field.type) {
      case "image":
        return (
          <div key={field.name} className="space-y-2">
            <Label>{field.label}</Label>
            <ImageUpload
              value={formData[field.name]}
              onChange={(url) => setFormData(prev => ({ ...prev, [field.name]: url }))}
            />
          </div>
        );

      case "select":
        return (
          <div key={field.name} className="space-y-2">
            <Label>{field.label}</Label>
            <Select
              value={formData[field.name]}
              onValueChange={(value) => setFormData(prev => ({ ...prev, [field.name]: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "number":
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              type="number"
              value={formData[field.name]}
              onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: parseInt(e.target.value) || "" }))}
              placeholder={field.placeholder}
            />
          </div>
        );

      default: // text
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              value={formData[field.name]}
              onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
              placeholder={field.placeholder}
            />
          </div>
        );
    }
  };

  const inputs = (
    <CollapsibleGeneratorForm>
      <div className="space-y-6">
        {flow.fields.map(renderField)}
        <Button 
          className="w-full" 
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? "Generando..." : "Generar"}
        </Button>
      </div>
    </CollapsibleGeneratorForm>
  );

  return (
    <GeneratorLayout inputs={inputs}>
      <UserRuns deploymentId={flow.deploymentId} />
    </GeneratorLayout>
  );
} 