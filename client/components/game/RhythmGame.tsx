import { useEffect, useMemo, useRef, useState } from "react";
import { useGame } from "@/state/game";

export function RhythmGame({ onWin }: { onWin?: () => void }) {
  const [beat, setBeat] = useState(0);
  const [score, setScore] = useState(0);
  const [active, setActive] = useState(false);
  const loopRef = useRef<number | null>(null);
  const { awardShard } = useGame();

  useEffect(() => {
    return () => {
      if (loopRef.current) cancelAnimationFrame(loopRef.current);
    };
  }, []);

  const start = () => {
    setScore(0);
    setActive(true);
    const startTime = performance.now();
    const bpm = 90;
    const beatMs = 60000 / bpm;

    const tick = () => {
      const t = performance.now() - startTime;
      const phase = (t % beatMs) / beatMs;
      setBeat(phase);
      loopRef.current = requestAnimationFrame(tick);
    };
    tick();
  };

  const stop = () => {
    setActive(false);
    if (loopRef.current) cancelAnimationFrame(loopRef.current);
  };

  const hit = () => {
    // Good if close to phase 0 (the pulse)
    const delta = Math.min(Math.abs(beat - 0), Math.abs(1 - beat));
    const good = delta < 0.12;
    setScore((s) => s + (good ? 1 : 0));
  };

  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "j" || e.key === " ") {
        e.preventDefault();
        hit();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, beat]);

  useEffect(() => {
    if (score >= 6) {
      stop();
      awardShard(1);
      onWin?.();
    }
  }, [score]);

  const glow = useMemo(() => 0.4 + Math.cos(beat * Math.PI * 2) * 0.3, [beat]);

  return (
    <div className="rounded-xl border border-border/50 p-4 bg-card/60">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold">Violin Rhythm</h4>
          <p className="text-sm text-muted-foreground">
            Press J or Space on the pulse. Score 6 to win a vision shard.
          </p>
        </div>
        {!active ? (
          <button
            onClick={start}
            className="px-3 py-1.5 rounded-md bg-primary/20 text-primary hover:bg-primary/30 transition"
          >
            Start
          </button>
        ) : (
          <button
            onClick={stop}
            className="px-3 py-1.5 rounded-md bg-muted text-foreground hover:bg-muted/80 transition"
          >
            Stop
          </button>
        )}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="relative w-24 h-24 grid place-items-center">
          <span
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 40px 10px hsl(var(--accent)/${glow})` }}
          />
          <span className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-2xl font-bold">
            ♪
          </span>
        </div>
        <div className="flex-1">
          <div className="h-2 w-full rounded bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${Math.min(score / 6, 1) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-sm">Score: {score} / 6</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Tip: Feel the pulse; tap just as it glows brightest.
      </p>
    </div>
  );
}
