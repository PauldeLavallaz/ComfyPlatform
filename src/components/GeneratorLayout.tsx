"use client";

import { ReactNode } from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface GeneratorLayoutProps {
  inputs: React.ReactNode;
  children: React.ReactNode;
}

export function GeneratorLayout({ inputs, children }: GeneratorLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar fijo para inputs */}
      <div className="hidden md:block w-64 h-screen fixed left-0 top-0 border-r bg-white overflow-y-auto">
        {inputs}
      </div>

      {/* Área de contenido scrolleable */}
      <main className="flex-1 md:ml-64 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 