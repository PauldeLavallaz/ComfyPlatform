"use client";

import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Upload, Check } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  showPreview?: boolean;
}

export function ImageUpload({ value, onChange, accept, showPreview = true }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setLoading(true);
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
      
      // Mostrar el indicador de éxito
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [onChange]);

  return (
    <div className="w-full">
      <Button
        type="button"
        variant="outline"
        disabled={loading}
        className={`w-full h-32 relative overflow-hidden ${value ? 'p-0' : ''}`}
        asChild
      >
        <label className="w-full h-full cursor-pointer">
          {value ? (
            <>
              {showPreview ? (
                <>
                  <img
                    src={value}
                    alt="Uploaded"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  {showSuccess ? (
                    <>
                      <Check className="w-6 h-6 text-green-500" />
                      <span className="text-green-500 text-sm">Imagen cargada con éxito</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-6 h-6" />
                      <span>Cambiar foto</span>
                      <span className="text-xs text-gray-500">Imagen cargada</span>
                    </>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload className="w-6 h-6" />
              <span>Subir Foto</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
        </label>
      </Button>
    </div>
  );
} 