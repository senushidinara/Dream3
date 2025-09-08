import React from "react";
import { SlideViewer } from "@/components/presentation/SlideViewer";

export default function Presentation() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-background to-background/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight">Presentation: The Mind Palace Quest</h1>
        <p className="text-muted-foreground mt-2">An interactive slide experience — click hotspots, play mini-games, and collect Dream Fragments as you explore.</p>

        <div className="mt-6">
          <SlideViewer />
        </div>
      </div>
    </div>
  );
}
