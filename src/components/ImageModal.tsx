"use client";

import { X } from "lucide-react";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full h-full flex items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-[101]"
          aria-label="Cerrar"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Contenedor de la imagen con ratio automático */}
        <div className="relative w-auto h-auto max-w-[95vw] max-h-[90vh]">
          <img
            src={imageUrl}
            alt="Imagen generada"
            className="rounded-lg object-contain w-auto h-auto max-w-full max-h-[90vh]"
            style={{
              boxShadow: '0 0 30px rgba(0, 0, 0, 0.3)'
            }}
          />
        </div>
      </div>
    </div>
  );
} 