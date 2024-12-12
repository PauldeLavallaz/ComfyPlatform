"use client";

import { useState } from "react";
import { ImageModal } from "./ImageModal";

export function ImageGenerationResult({ imageUrl }: { imageUrl: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <img
          src={imageUrl}
          alt="Generated image"
          className="w-full h-full cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      
      <ImageModal 
        imageUrl={imageUrl}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

