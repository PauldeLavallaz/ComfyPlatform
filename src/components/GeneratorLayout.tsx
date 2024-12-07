"use client";

import { ReactNode } from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface GeneratorLayoutProps {
  children: ReactNode;
  inputs: ReactNode;
}

export function GeneratorLayout({ children, inputs }: GeneratorLayoutProps) {
  return (
    <div className="flex-1 flex relative">
      {/* Área principal de imágenes generadas */}
      <ScrollArea className="flex-1 p-6 w-full">
        <div className="w-full">
          {children}
        </div>
      </ScrollArea>

      {/* Panel lateral de inputs - solo visible en desktop */}
      <Card className="hidden md:block w-[400px] border-l rounded-none h-screen overflow-y-auto shrink-0">
        <div className="p-6 space-y-6">
          {inputs}
        </div>
      </Card>

      {/* Panel de inputs móvil - posicionado absolutamente para no afectar el layout */}
      <div className="md:hidden absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto">
          {inputs}
        </div>
      </div>
    </div>
  );
} 