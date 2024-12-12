"use client";

import { ReactNode } from "react";

interface GeneratorLayoutProps {
  inputs: React.ReactNode;
  children: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}

export function GeneratorLayout({ inputs, children, title, action }: GeneratorLayoutProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header fijo con borde inferior */}
      <header className="flex items-center justify-between px-6 h-16 bg-white border-b shrink-0">
        <h1 className="text-2xl font-bold">{title}</h1>
        {action && <div>{action}</div>}
      </header>

      {/* Contenedor principal con scroll */}
      <div className="flex-1 flex overflow-hidden">
        {/* Área de contenido principal con scroll y padding */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

        {/* Sidebar derecho fijo en desktop */}
        <aside className="hidden md:block w-[400px] border-l bg-white overflow-y-auto">
          {inputs}
        </aside>
      </div>
    </div>
  );
} 