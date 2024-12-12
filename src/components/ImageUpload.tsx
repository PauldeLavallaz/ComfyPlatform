"use client";

import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Upload, Loader2, Check } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
}

export function ImageUpload({ value, onChange, accept }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/file/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al subir la imagen");
      }

      onChange(data.file_url);
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "Error al subir la imagen");
    } finally {
      setLoading(false);
    }
  }, [onChange]);

  return (
    <div className="space-y-4">
      {/* Botón de carga */}
      <Button
        type="button"
        variant="outline"
        disabled={loading}
        className="w-full h-20 relative"
        asChild
      >
        <label className="cursor-pointer flex items-center justify-center">
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Cargando...</span>
            </div>
          ) : value ? (
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Cambiar foto</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              <span>Subir Foto</span>
            </div>
          )}
          <input
            type="file"
            accept={accept}
            onChange={onFileChange}
            className="hidden"
          />
        </label>
      </Button>

      {/* Previsualización de la imagen */}
      {value && (
        <div className="relative w-32 h-32 mx-auto overflow-hidden rounded-lg border">
          <img
            src={value}
            alt="Vista previa"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}
    </div>
  );
} 