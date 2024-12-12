"use client";

import { LoadingIcon } from "@/components/LoadingIcon";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { ImageModal } from "./ImageModal";

interface ImageGenerationResultProps {
  runId: string;
  className?: string;
  initialStatus?: string;
  initialImageUrl?: string;
  onClick?: () => void;
}

export function ImageGenerationResult({ 
  runId, 
  className, 
  initialStatus,
  initialImageUrl,
  onClick 
}: ImageGenerationResultProps) {
  const [image, setImage] = useState(initialImageUrl || "");
  const [status, setStatus] = useState<string>(initialStatus || "queued");
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(!initialImageUrl);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // ... resto del código de useEffect sin cambios ...
  }, [runId, initialImageUrl, retryCount]);

  return (
    <>
      <Card 
        className={cn(
          "overflow-hidden w-full aspect-[512/512] relative",
          className
        )}
      >
        {!loading && image && (
          <img
            src={image} 
            alt="Generated image"
            className="w-full h-full object-cover cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsModalOpen(true);
              if (onClick) onClick();
            }}
          />
        )}
        {/* ... resto del código de loading y skeleton sin cambios ... */}
      </Card>
      
      <ImageModal 
        imageUrl={image}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

