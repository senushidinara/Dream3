import { WordUnscramble } from "@/components/game/WordUnscramble";
import { DreamFragment } from "@/components/game/DreamFragment";
import { useGame } from "@/state/game";
import { useState } from "react";

function ReflectionChoice() {
  const [choice, setChoice] = useState<string | null>(null);
  return (
    <div className="rounded-xl border border-border/50 p-4 bg-card/60">
      <h4 className="font-semibold">Reflection</h4>
      <p className="text-sm text-muted-foreground">
        Which theme called to you most today?
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { id: "curiosity", label: "Curiosity" },
          { id: "courage", label: "Courage" },
          { id: "clarity", label: "Clarity" },
          { id: "joy", label: "Joy" },
        ].map((o) => (
          <button
            key={o.id}
            onClick={() => setChoice(o.id)}
            className={`px-3 py-1.5 rounded-md border ${choice === o.id ? "bg-primary text-primary-foreground border-transparent" : "bg-background hover:bg-muted/50"}`}
          >
            {o.label}
          </button>
        ))}
      </div>
      {choice && (
        <p className="mt-3 text-sm text-primary">
          Noted. Your path bends toward {choice}.
        </p>
      )}
    </div>
  );
}

export default function Library() {
  const { fragments } = useGame();
  const gated = fragments < 3;
  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div
          className="page-hero rounded-xl overflow-hidden"
          style={{
            backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fb964bc979b7949f6b16bbc771d0dda43?format=webp&width=1600')`,
            height: 320,
          }}
        >
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Memory Library
            </h1>
            <p className="text-white/85 mt-2 max-w-2xl">
              Solve puzzles woven from your memories. Some tomes require
              fragments from elsewhere.
            </p>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <div className="relative">
            <WordUnscramble answer="Imagination" />
            <DreamFragment
              id="frag-library-1"
              className="absolute -top-2 -right-2"
            />
          </div>

          <div className="relative">
            {gated ? (
              <div className="rounded-xl border border-dashed border-border/60 p-6 bg-card/40 grid place-items-center text-center">
                <div>
                  <p className="font-semibold">This chamber is sealed</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Collect at least 3 Dream Fragments to open.
                  </p>
                </div>
              </div>
            ) : (
              <ReflectionChoice />
            )}
            <DreamFragment
              id="frag-library-2"
              className="absolute -top-2 -right-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
