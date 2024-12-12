"use client";

import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  showPreview?: boolean;
}

export function ImageUpload({ value, onChange, accept, showPreview = true }: ImageUploadProps) {
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
      <Button
        type="button"
        variant="outline"
        disabled={loading}
        className="w-full h-32 flex flex-col gap-2"
        asChild
      >
        <label>
          <Upload className="w-6 h-6" />
          <span>Subir Foto</span>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
        </label>
      </Button>

      {showPreview && value && (
        <div className="relative aspect-square w-full max-w-[200px] mx-auto overflow-hidden rounded-lg border">
          <img
            src={value}
            alt="Uploaded"
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
} 