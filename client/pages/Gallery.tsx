import { RhythmGame } from "@/components/game/RhythmGame";
import { DreamFragment } from "@/components/game/DreamFragment";
import { useState } from "react";

function ColorReveal() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="rounded-xl border border-border/50 p-4 bg-card/60">
      <h4 className="font-semibold">Canvas Reveal</h4>
      <p className="text-sm text-muted-foreground">
        Drag the color orb onto the canvas to reveal the painting.
      </p>
      <div className="mt-4 grid grid-cols-5 gap-4 items-center">
        <div className="col-span-4 relative">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => setRevealed(true)}
            className="aspect-[16/9] rounded-lg overflow-hidden border bg-gradient-to-br from-muted to-muted/60 grid place-items-center"
          >
            {!revealed ? (
              <div className="text-sm text-muted-foreground">
                Drop color here
              </div>
            ) : (
              <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent)/.35),transparent_40%),radial-gradient(circle_at_80%_60%,hsl(var(--secondary)/.35),transparent_35%),linear-gradient(135deg,hsl(var(--primary)/.4),hsl(var(--accent)/.35),hsl(var(--secondary)/.4))]" />
            )}
          </div>
        </div>
        <div className="col-span-1 grid gap-3">
          <div
            draggable
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary via-accent to-secondary shadow-lg cursor-grab active:cursor-grabbing"
          />
          {revealed && <span className="text-xs text-primary">Revealed!</span>}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="page-hero rounded-xl overflow-hidden" style={{ backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fc4e7bcb3c490419da0e26370418c5825?format=webp&width=1600')`, height: 320 }}>
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Passion Galleries
            </h1>
            <p className="text-white/85 mt-2 max-w-2xl">Each object is a portal. Play, create, and unlock new rooms.</p>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <div className="relative">
            <RhythmGame />
            <DreamFragment
              id="frag-gallery-1"
              className="absolute -top-2 -right-2"
            />
          </div>
          <div className="relative">
            <ColorReveal />
            <DreamFragment
              id="frag-gallery-2"
              className="absolute -top-2 -right-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
