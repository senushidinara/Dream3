import { useGame } from "@/state/game";
import { useMemo, useState } from "react";

export function DreamFragment({ id, className = "" }: { id: string; className?: string }) {
  const { collectFragment, collected } = useGame();
  const [burst, setBurst] = useState(false);
  const isCollected = useMemo(() => !!collected[id], [collected, id]);

  return (
    <button
      aria-label="Dream Fragment"
      onClick={() => {
        if (isCollected) return;
        setBurst(true);
        collectFragment(id);
        setTimeout(() => setBurst(false), 600);
      }}
      className={
        "relative grid place-items-center w-8 h-8 rounded-full " +
        (isCollected ? "opacity-40 cursor-default " : "cursor-pointer hover:scale-110 ") +
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
