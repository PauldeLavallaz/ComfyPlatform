"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-b from-black/95 to-black/90 flex flex-col">
      {/* Header con botón de cerrar */}
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="text-white p-2 hover:text-white/80 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      {/* Contenedor de la imagen centrado */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-full max-h-full">
          <img
            src={imageUrl}
            alt="Imagen generada"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
} 