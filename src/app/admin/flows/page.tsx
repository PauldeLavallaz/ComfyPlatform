"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import useSWR from "swr";

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
  route: string;
  icon: string;
  fields: FlowField[];
}

export default function FlowsAdmin() {
  const { data: flows = [], mutate } = useSWR<Flow[]>("/api/flows");
  const [selectedFlow, setSelectedFlow] = useState<Flow | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<Flow>>({
    name: "",
    description: "",
    deploymentId: "",
    route: "",
    icon: "Sparkles",
    fields: []
  });

  const [newField, setNewField] = useState<Partial<FlowField>>({
    name: "",
    type: "text",
    label: "",
    placeholder: "",
  });

  const handleAddField = () => {
    if (!formData.fields) return;
    if (!newField.name || !newField.label) {
      toast.error("El nombre y la etiqueta del campo son requeridos");
      return;
    }
    setFormData({
      ...formData,
      fields: [...formData.fields, newField as FlowField]
    });
    setNewField({
      name: "",
      type: "text",
      label: "",
      placeholder: "",
    });
  };

  const handleSaveFlow = async () => {
    try {
      if (!formData.name || !formData.deploymentId || !formData.route) {
        toast.error("Por favor completa todos los campos requeridos");
        return;
      }

      if (isEditing && selectedFlow) {
        await fetch("/api/flows", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            flowId: selectedFlow.id,
            ...formData
          }),
        });
        toast.success("Flujo actualizado correctamente");
      } else {
        await fetch("/api/flows", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        toast.success("Flujo creado correctamente");
      }

      await mutate();
      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al guardar el flujo");
    }
  };

  const handleEditFlow = (flow: Flow) => {
    setSelectedFlow(flow);
    setFormData(flow);
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleDeleteFlow = async (flowId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este flujo?")) return;

    try {
      await fetch("/api/flows", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flowId }),
      });
      toast.success("Flujo eliminado correctamente");
      await mutate();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al eliminar el flujo");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      deploymentId: "",
      route: "",
      icon: "Sparkles",
      fields: []
    });
    setIsEditing(false);
    setSelectedFlow(null);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestionar Flujos</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => {
              resetForm();
              setIsOpen(true);
            }}>
              <Plus className="w-4 h-4" />
              Nuevo Flujo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Editar Flujo" : "Nuevo Flujo"}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[80vh] overflow-y-auto px-1">
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del Flujo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="ej: Generador Básico"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="route">Ruta</Label>
                    <Input
                      id="route"
                      value={formData.route}
                      onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                      placeholder="ej: /generator/basic"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe el propósito de este flujo..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deploymentId">ID del Deployment</Label>
                  <Input
                    id="deploymentId"
                    value={formData.deploymentId}
                    onChange={(e) => setFormData({ ...formData, deploymentId: e.target.value })}
                    placeholder="ej: e322689e-065a-4d33-aa6a-ee941803ca95"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Campos del Formulario</Label>
                    <Button variant="outline" size="sm" onClick={handleAddField}>
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Campo
                    </Button>
                  </div>

                  {/* Lista de campos existentes */}
                  <div className="space-y-4">
                    {formData.fields?.map((field, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{field.label}</p>
                            <p className="text-sm text-gray-500">Tipo: {field.type}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newFields = formData.fields?.filter((_, i) => i !== index);
                              setFormData({ ...formData, fields: newFields });
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Formulario para nuevo campo */}
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fieldName">Nombre del Campo</Label>
                          <Input
                            id="fieldName"
                            value={newField.name}
                            onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                            placeholder="ej: prompt"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fieldType">Tipo</Label>
                          <select
                            id="fieldType"
                            className="w-full px-3 py-2 border rounded-md"
                            value={newField.type}
                            onChange={(e) => setNewField({ ...newField, type: e.target.value as FlowField["type"] })}
                          >
                            <option value="text">Texto</option>
                            <option value="number">Número</option>
                            <option value="select">Select</option>
                            <option value="image">Imagen</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fieldLabel">Etiqueta</Label>
                        <Input
                          id="fieldLabel"
                          value={newField.label}
                          onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                          placeholder="ej: Descripción"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fieldPlaceholder">Placeholder</Label>
                        <Input
                          id="fieldPlaceholder"
                          value={newField.placeholder}
                          onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                          placeholder="ej: Ingresa tu descripción..."
                        />
                      </div>
                    </div>
                  </Card>
                </div>

                <Button onClick={handleSaveFlow} className="w-full">
                  {isEditing ? "Guardar Cambios" : "Crear Flujo"}
                </Button>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de flujos existentes */}
      <div className="space-y-4">
        {flows.map((flow) => (
          <Card key={flow.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{flow.name}</h3>
                <p className="text-gray-500">{flow.description}</p>
                <p className="text-sm text-gray-400 mt-2">Ruta: {flow.route}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEditFlow(flow)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteFlow(flow.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 