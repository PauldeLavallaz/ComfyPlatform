"use client";

import { ReactNode } from "react";

interface GeneratorLayoutProps {
  inputs: React.ReactNode;
  children: React.ReactNode;
  title: string;
  action?: React.ReactNode; // Para el botón Generar
}

export function GeneratorLayout({ inputs, children, title, action }: GeneratorLayoutProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header fijo con título y acción */}
      <header className="flex items-center justify-between h-14 px-6 border-b bg-white shrink-0">
        <h1 className="text-2xl font-bold">{title}</h1>
        {action && <div className="ml-auto">{action}</div>}
      </header>

      {/* Contenedor principal */}
      <div className="flex-1 flex overflow-hidden">
        {/* Contenido principal scrollable */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>

        {/* Sidebar a la derecha, fijo en desktop */}
        <aside className="hidden md:block w-[400px] border-l bg-white overflow-y-auto shrink-0">
          {inputs}
        </aside>
      </div>
    </div>
  );
} 