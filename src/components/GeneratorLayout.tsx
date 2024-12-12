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
    <div className="flex-1 flex relative h-[calc(100vh-4rem)]">
      {/* Área principal de imágenes generadas - con altura fija */}
      <ScrollArea className="flex-1 p-6 w-full">
        <div className="max-w-[1200px] mx-auto">
          {children}
        </div>
      </ScrollArea>

      {/* Panel lateral de inputs - solo visible en desktop */}
      <Card className="hidden md:block w-[400px] border-l rounded-none h-full overflow-y-auto">
        <div className="p-6 space-y-6">
          {inputs}
        </div>
      </Card>

      {/* Panel de inputs móvil - posicionado absolutamente */}
      <div className="md:hidden fixed inset-x-0 bottom-0 top-auto pointer-events-none">
        <div className="pointer-events-auto">
          {inputs}
        </div>
      </div>
    </div>
  );
} 