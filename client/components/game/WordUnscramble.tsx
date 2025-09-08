import { useMemo, useState } from "react";
import { useGame } from "@/state/game";

function shuffle(word: string) {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

export function WordUnscramble({ answer }: { answer: string }) {
  const [value, setValue] = useState("");
  const [won, setWon] = useState(false);
  const { awardKey } = useGame();

  const scrambled = useMemo(() => shuffle(answer.toUpperCase()), [answer]);

  return (
    <div className="rounded-xl border border-border/50 p-4 bg-card/60">
      <h4 className="font-semibold">Memory Puzzle</h4>
      <p className="text-sm text-muted-foreground">
        Unscramble the word to unlock a memory key.
      </p>
      <div className="mt-4 flex items-center gap-2">
        <div className="px-3 py-1.5 rounded bg-muted/70 font-mono tracking-widest text-lg">
          {scrambled}
        </div>
        <input
          className="flex-1 px-3 py-2 rounded-md bg-background border focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Your answer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:opacity-90"
          onClick={() => {
            if (value.trim().toLowerCase() === answer.toLowerCase()) {
              if (!won) awardKey(1);
              setWon(true);
            }
          }}
        >
          Unlock
        </button>
      </div>
      {won && (
        <p className="mt-3 text-sm text-primary">
          Unlocked! You gained a Memory Key.
        </p>
      )}
    </div>
  );
}
