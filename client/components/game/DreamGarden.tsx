import React, { useEffect, useMemo, useRef, useState } from "react";
import ThreeScene from "@/components/presentation/ThreeScene";
import Stardust from "@/components/ui/Stardust";
import { useGame } from "@/state/game";
import { toast } from "@/components/ui/use-toast";

const BLOSSOM_SRC =
  "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fbdb201c0f0b44a618e382f105e9991c5?format=webp&width=300";
const BUTTERFLY_SRC =
  "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F33b2df6a9ce04f07a5026a2750b74dfe?format=webp&width=200";

export default function DreamGarden({
  className = "",
}: {
  className?: string;
}) {
  const { collectFragment, collected, awardShard } = useGame();
  const [blossoms, setBlossoms] = useState(
    () =>
      [
        { id: "b1", x: 16, y: 42 },
        { id: "b2", x: 34, y: 58 },
        { id: "b3", x: 52, y: 36 },
        { id: "b4", x: 70, y: 52 },
        { id: "b5", x: 84, y: 28 },
      ] as { id: string; x: number; y: number }[],
  );

  const [butterflies, setButterflies] = useState(() =>
    Array.from({ length: 3 }).map((_, i) => ({
      id: `bf-${i}`,
      x: 20 + i * 28,
      y: 18 + (i % 2) * 8,
      caught: false,
    })),
  );

  const [placed, setPlaced] = useState<string[]>([]);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [fountainCollected, setFountainCollected] = useState(false);

  const gardenImages = useMemo(
    () => [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F33b2df6a9ce04f07a5026a2750b74dfe?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F93dadccc050e43ab9aaa15480d1b67c5?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fb6e58e6105ef4b54af6e82935b277868?format=webp&width=1600",
    ],
    [],
  );

  // when blossom clicked, collect fragment
  const handleBlossom = (b: { id: string }) => {
    const fid = `frag-garden-${b.id}`;
    if (collected[fid]) {
      toast({
        title: "Already picked",
        description: "You already collected that blossom.",
      });
      return;
    }
    collectFragment(fid);
    toast({
      title: "Dream Blossom",
      description: "You picked a glowing blossom and felt a memory stir.",
    });
  };

  const handleButterfly = (bfId: string) => {
    setButterflies((prev) =>
      prev.map((b) => (b.id === bfId ? { ...b, caught: true } : b)),
    );
    awardShard(1);
    toast({
      title: "Butterfly caught",
      description: "A stardust clue revealed — you earned a vision shard.",
    });
  };

  const placeBlossomInGate = (blossomId?: string) => {
    // if blossomId provided, try to place it (only if collected)
    if (!blossomId) return;
    const fid = `frag-garden-${blossomId}`;
    if (!collected[fid]) {
      toast({
        title: "Missing Blossom",
        description: "Collect this blossom first to place it in the gate.",
      });
      return;
    }
    if (placed.length >= 3) {
      toast({
        title: "Gate full",
        description: "Remove a placed blossom before placing another.",
      });
      return;
    }
    if (placed.includes(blossomId)) {
      toast({
        title: "Already placed",
        description: "That blossom is already in the gate.",
      });
      return;
    }
    const next = [...placed, blossomId];
    setPlaced(next);
    // check sequence; predefined correct order b2,b4,b1 (example)
    const correct = ["b2", "b4", "b1"];
    if (next.length === 3) {
      const ok = next.every((v, i) => v === correct[i]);
      if (ok) {
        setPuzzleSolved(true);
        toast({
          title: "Gate unlocked",
          description: "Crystal vines rearranged — the Fountain stirs.",
        });
      } else {
        toast({
          title: "Not quite",
          description: "The sequence is not correct. Try again.",
        });
      }
    }
  };

  const removePlaced = (idx: number) => {
    setPlaced((p) => p.filter((_, i) => i !== idx));
  };

  const handleFountain = () => {
    if (!puzzleSolved) {
      toast({
        title: "Locked",
        description: "Solve the Puzzle Gate first to awaken the Fountain.",
      });
      return;
    }
    if (fountainCollected) {
      toast({
        title: "Collected",
        description: "You already collected the Fountain's fragment.",
      });
      return;
    }
    collectFragment("frag-garden-fountain");
    setFountainCollected(true);
    toast({
      title: "Fountain of Clarity",
      description: "A memory fragment rose from the water.",
    });
  };

  // subtle butterfly float animation
  useEffect(() => {
    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.01;
      setButterflies((prev) =>
        prev.map((b, i) => ({ ...b, x: (b.x + Math.sin(t + i) * 0.2) % 100 })),
      );
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={
        "relative rounded-lg overflow-hidden border border-border/50 bg-card/60 " +
        className
      }
    >
      <div className="w-full aspect-[16/9] relative">
        <ThreeScene
          images={gardenImages}
          filter="brightness(1.02) saturate(1.08)"
        />
        <div className="absolute inset-0">
          <Stardust intensity={40} color="220,240,220" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/18 pointer-events-none" />

        {/* interactive blossoms */}
        {blossoms.map((b) => (
          <button
            key={b.id}
            onClick={() => handleBlossom(b)}
            className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${b.x}%`, top: `${b.y}%`, width: 44, height: 44 }}
            aria-label={`Blossom ${b.id}`}
          >
            <img
              src={BLOSSOM_SRC}
              alt="blossom"
              className={`w-full h-full rounded-full shadow-lg ${collected[`frag-garden-${b.id}`] ? "opacity-40 grayscale" : ""}`}
            />
          </button>
        ))}

        {/* butterflies */}
        {butterflies.map((bf) => (
          <button
            key={bf.id}
            onClick={() => !bf.caught && handleButterfly(bf.id)}
            className="absolute w-12 h-12 rounded-full p-0"
            style={{ left: `${bf.x}%`, top: `${bf.y}%` }}
            aria-label={`butterfly ${bf.id}`}
          >
            <img
              src={BUTTERFLY_SRC}
              alt="butterfly"
              className={`w-full h-full ${bf.caught ? "opacity-30" : "animate-bounce"}`}
            />
          </button>
        ))}

        {/* Puzzle Gate & Fountain UI bottom center */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 pointer-events-auto">
          <div className="bg-[rgba(8,6,12,0.9)] rounded-xl p-4 flex items-center gap-4 shadow-xl border border-primary/20">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => (placed[i] ? removePlaced(i) : null)}
                  className="w-12 h-12 rounded-md bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center text-sm text-foreground"
                >
                  {placed[i] ? placed[i] : "—"}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  // pick first collected but unplaced blossom
                  const candidate = blossoms.map(b => b.id).find(id => collected[`frag-garden-${id}`] && !placed.includes(id));
                  if (!candidate) {
                    toast({ title: 'No blossom', description: 'Collect a blossom first to place it.' });
                    return;
                  }
                  placeBlossomInGate(candidate);
                }}
                className="px-3 py-1 rounded bg-primary/20 text-primary text-sm"
                aria-label="Place blossom"
              >
                Place
              </button>
              <button
                onClick={() => setPlaced([])}
                className="px-3 py-1 rounded bg-destructive/10 text-destructive text-sm"
              >
                Reset
              </button>
            </div>

            <div className="ml-4">
              <button
                onClick={handleFountain}
                className={`px-4 py-2 rounded-md text-sm font-semibold ${puzzleSolved ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"}`}
              >
                {puzzleSolved
                  ? fountainCollected
                    ? "Collected"
                    : "Activate Fountain"
                  : "Locked"}
              </button>
            </div>
          </div>

          <div className="mt-2 text-xs text-muted-foreground text-center">
            Puzzle Gate: place 3 blossoms in correct order to awaken the
            Fountain.
          </div>
        </div>
      </div>

      <div className="p-4 flex items-center gap-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Garden — explore, catch butterflies, place blossoms.
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 rounded bg-primary/20 text-primary">
            Fragments:{" "}
            {useMemo(
              () =>
                Object.keys(collected).filter((k) =>
                  k.startsWith("frag-garden"),
                ).length,
              [collected],
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
