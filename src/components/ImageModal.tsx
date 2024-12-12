"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100]"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 hover:text-white/80 transition-colors rounded-full bg-black/20 backdrop-blur-sm z-[101]"
        aria-label="Cerrar"
      >
        <X className="w-6 h-6" />
      </button>

      <div 
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt="Imagen generada"
          className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
        />
      </div>
    </div>
  );
} 