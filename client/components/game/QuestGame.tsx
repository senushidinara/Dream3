import React, { useState } from "react";
import ThreeScene from "@/components/presentation/ThreeScene";
import Stardust from "@/components/ui/Stardust";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RhythmGame } from "@/components/game/RhythmGame";
import { WordUnscramble } from "@/components/game/WordUnscramble";
import { DreamFragment } from "@/components/game/DreamFragment";
import { useGame } from "@/state/game";
import { useNavigate } from "react-router-dom";

export default function QuestGame() {
  const [open, setOpen] = useState<null | "music" | "puzzle">(null);
  const nav = useNavigate();
  const game = useGame();

  const BG = [
    "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F4a88de3643ac4b62bd737434ee86f787?format=webp&width=1600",
    "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F60be10a892124302b050b30deb7efcec?format=webp&width=1600",
    "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F73b70f44dc2345898716d28d84608f27?format=webp&width=1600",
  ];

  const travel = (to: string) => nav(to);

  return (
    <div className="rounded-2xl overflow-hidden border border-border/50 bg-card/40">
      <div className="relative w-full aspect-[16/9]">
        <ThreeScene images={BG} filter="brightness(1.02) saturate(1.06)" />
        <div className="absolute inset-0">
          <Stardust intensity={36} color="230,220,255" />
        </div>

        {/* HUD */}
        <div className="absolute left-4 top-4 flex gap-2 text-xs">
          <div className="px-2 py-1 rounded bg-[rgba(0,0,0,0.55)] text-white border border-border/40">
            Fragments {game.fragments}
          </div>
          <div className="px-2 py-1 rounded bg-[rgba(0,0,0,0.55)] text-white border border-border/40">
            Shards {game.shards}
          </div>
          <div className="px-2 py-1 rounded bg-[rgba(0,0,0,0.55)] text-white border border-border/40">
            Keys {game.keys}
          </div>
        </div>

        {/* Doors (clickable hotspots) */}
        {[
          { id: "music", label: "Music Hall", x: 20, y: 55 },
          { id: "puzzle", label: "Puzzle Tome", x: 76, y: 50 },
        ].map((d) => (
          <button
            key={d.id}
            onClick={() => setOpen(d.id as any)}
            className="absolute z-10 rounded-full border border-primary/40 bg-gradient-to-tr from-primary/20 to-accent/10 shadow-lg backdrop-blur-sm hover:scale-105 transform transition-all"
            style={{ left: `${d.x}%`, top: `${d.y}%`, width: 80, height: 80 }}
            aria-label={`Open ${d.label}`}
          >
            <span className="absolute -inset-1 rounded-full bg-primary/20 blur-md" />
            <span className="relative text-[11px] font-semibold">
              {d.label}
            </span>
          </button>
        ))}

        {/* Travel nodes to other realms */}
        <div className="absolute right-4 top-4 grid gap-2">
          <button
            onClick={() => travel("/islands")}
            className="px-2 py-1 rounded bg-primary/20 text-primary text-xs"
          >
            Islands
          </button>
          <button
            onClick={() => travel("/gallery")}
            className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs"
          >
            Gallery
          </button>
          <button
            onClick={() => travel("/library")}
            className="px-2 py-1 rounded bg-muted text-xs"
          >
            Library
          </button>
          <button
            onClick={() => travel("/constellation")}
            className="px-2 py-1 rounded bg-muted text-xs"
          >
            Constellation
          </button>
        </div>

        {/* Collectibles */}
        <DreamFragment
          id="quest-frag-1"
          className="absolute left-[48%] top-[26%]"
        />
        <DreamFragment
          id="quest-frag-2"
          className="absolute left-[32%] top-[70%]"
        />
        <DreamFragment
          id="quest-frag-3"
          className="absolute left-[66%] top-[28%]"
        />
      </div>

      {/* Modals */}
      <Dialog open={open === "music"} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Music Hall Challenge</DialogTitle>
          </DialogHeader>
          <RhythmGame onWin={() => setOpen(null)} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={open === "puzzle"}
        onOpenChange={(o) => !o && setOpen(null)}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Puzzle Tome</DialogTitle>
          </DialogHeader>
          <WordUnscramble answer="Imagination" />
        </DialogContent>
      </Dialog>

      <div className="p-3 text-xs text-muted-foreground">
        Goal: collect 3 fragments (left), win 1 shard (music), earn 1 key
        (puzzle). Travel anywhere from the panel on the right.
      </div>
    </div>
  );
}
