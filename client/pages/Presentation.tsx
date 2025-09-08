import React from "react";
import { SlideViewer } from "@/components/presentation/SlideViewer";

export default function Presentation() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-background to-background/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight">The Mind Palace — Quest</h1>
        <p className="text-muted-foreground mt-2">Enter an interactive, fantasy quest — every scene is clickable, full of puzzles, crystals, and dream fragments. Play, collect, and shape your constellation.</p>

        <div className="mt-6">
          <SlideViewer />
        </div>
      </div>
    </div>
  );
}
