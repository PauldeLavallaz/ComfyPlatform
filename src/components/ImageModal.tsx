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
    <div 
      className="fixed inset-0 z-[100] bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="fixed inset-0 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Contenedor de la imagen */}
        <div className="relative w-full max-w-4xl mx-auto">
          <img
            src={imageUrl}
            alt="Imagen generada"
            className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Botón de cerrar - ahora flotando sobre la imagen */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
} 