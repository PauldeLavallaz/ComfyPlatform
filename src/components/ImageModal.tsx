"use client";

import { X } from "lucide-react";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  return (
    <div 
      className="fixed inset-0 z-[100] bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Botón de cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:text-white/80 transition-colors z-[101]"
        aria-label="Cerrar"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Contenedor de la imagen */}
      <div 
        className="absolute inset-0 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-w-4xl mx-auto">
          <img
            src={imageUrl}
            alt="Imagen generada"
            className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
} 