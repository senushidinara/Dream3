import React from "react";
import DreamGarden from "@/components/game/DreamGarden";

export default function Garden() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-background to-background/40 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-extrabold">Dream Garden</h1>
        <p className="text-muted-foreground mt-2 mb-4">
          Explore the living garden: collect blossoms, follow butterflies, solve
          the Gate puzzle and awaken the Fountain of Clarity.
        </p>
        <DreamGarden />
      </div>
    </div>
  );
}
