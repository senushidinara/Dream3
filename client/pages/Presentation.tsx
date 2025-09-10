import React from "react";
import QuestGame from "@/components/game/QuestGame";

export default function Presentation() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-background to-background/40">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Quest</h1>
        <p className="text-sm text-muted-foreground">
          Interactive. No slides. Collect, solve, travel.
        </p>
        <div className="mt-4">
          <QuestGame />
        </div>
      </div>
    </div>
  );
}
