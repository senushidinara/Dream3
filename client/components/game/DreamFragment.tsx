import { useGame } from "@/state/game";
import { useMemo, useState } from "react";

export function DreamFragment({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const { collectFragment, collected } = useGame();
  const [burst, setBurst] = useState(false);
  const isCollected = useMemo(() => !!collected[id], [collected, id]);

  const playChime = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 880;
      g.gain.value = 0.0001;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      // envelope
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.35);
      setTimeout(() => {
        o.stop();
        ctx.close();
      }, 400);
    } catch (e) {
      // ignore
    }
  };

  return (
    <button
      aria-label="Dream Fragment"
      onClick={() => {
        if (isCollected) return;
        playChime();
        setBurst(true);
        collectFragment(id);
        setTimeout(() => setBurst(false), 600);
      }}
      className={
        "relative grid place-items-center w-8 h-8 rounded-full " +
        (isCollected
          ? "opacity-40 cursor-default "
          : "cursor-pointer hover:scale-110 ") +
        "transition " +
        className
      }
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-accent to-secondary blur-md opacity-70" />
      <span className="relative w-3.5 h-3.5 rounded-sm rotate-45 bg-gradient-to-br from-primary to-accent shadow-inner shadow-primary/30" />
      {burst && (
        <span className="pointer-events-none absolute -inset-2 animate-ping rounded-full bg-primary/40" />
      )}
    </button>
  );
}
