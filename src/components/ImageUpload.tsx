"use client";

import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Camera, Upload } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  capture?: "user" | "environment";
}

export function ImageUpload({ value, onChange, accept, capture }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [onChange]);

  return (
    <div className="space-y-4 w-full">
      <div className="flex gap-4">
        {/* Botón para tomar foto */}
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          className="flex-1"
          asChild
        >
          <label>
            <Camera className="w-4 h-4 mr-2" />
            Tomar Foto
            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={onFileChange}
              className="hidden"
            />
          </label>
        </Button>

        {/* Botón para subir desde galería */}
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          className="flex-1"
          asChild
        >
          <label>
            <Upload className="w-4 h-4 mr-2" />
            Subir Foto
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
          </label>
        </Button>
      </div>

      {value && (
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
          <img
            src={value}
            alt="Uploaded"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
} 