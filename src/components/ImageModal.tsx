"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react";

export function ImageModal({ 
  isOpen, 
  imageUrl, 
  onClose 
}: { 
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[999999]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md pointer-events-none" />
      
      <div 
        className="absolute inset-0 flex items-center justify-center p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -top-10 right-2 text-white/90 hover:text-white transition-all p-2 z-20"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={imageUrl}
            alt="Vista completa"
            className="w-auto h-auto max-w-[85vw] max-h-[80vh] object-contain rounded-lg"
          />
        </div>
      </div>
    </div>,
    document.body
  );
} 