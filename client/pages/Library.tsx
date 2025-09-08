import { WordUnscramble } from "@/components/game/WordUnscramble";
import { DreamFragment } from "@/components/game/DreamFragment";
import { useGame } from "@/state/game";
import { useState } from "react";
import ThreeScene from "@/components/presentation/ThreeScene";
import Stardust from "@/components/ui/Stardust";

const BOOKS = [
  {
    id: "book-1",
    title: "Tome of Curiosity",
    img: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F30706a87523649f5beef624d82d532f8?format=webp&width=800",
    type: "puzzle",
  },
  {
    id: "book-2",
    title: "Atlas of Dreams",
    img: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F87bed8aeb5ea424bb55fde6ccc5a9c3b?format=webp&width=800",
    type: "reflection",
  },
  {
    id: "book-3",
    title: "Fragments & Folios",
    img: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F36e0ec88ec954051a6e71df6ec1000b9?format=webp&width=800",
    type: "puzzle",
  },
];

function ReflectionChoice({ onClose }: { onClose?: () => void }) {
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
      <div className="mt-4 text-right">
        <button onClick={onClose} className="px-3 py-1 rounded bg-muted">
          Close
        </button>
      </div>
    </div>
  );
}

export default function Library() {
  const { fragments } = useGame();
  const gated = fragments < 3;
  const [openBook, setOpenBook] = useState<string | null>(null);

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{ height: 320 }}
        >
          <ThreeScene
            images={[
              "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fb964bc979b7949f6b16bbc771d0dda43?format=webp&width=1600",
              "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F30706a87523649f5beef624d82d532f8?format=webp&width=1600",
            ]}
            filter="brightness(1.02) saturate(1.08)"
          />
          <div className="absolute inset-0">
            <Stardust intensity={28} color="220,230,255" />
          </div>
          <div className="absolute inset-0 p-8 flex items-end">
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Memory Library
              </h1>
              <p className="text-white/95 mt-2 max-w-2xl">
                Solve puzzles woven from your memories. Some tomes require
                fragments from elsewhere.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          {BOOKS.map((b) => (
            <div
              key={b.id}
              className="rounded-xl border border-border/50 p-4 bg-card/60 relative"
            >
              <div className="aspect-[4/3] rounded overflow-hidden bg-muted/10">
                <img
                  src={b.img}
                  alt={b.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="mt-3 font-semibold">{b.title}</h4>
              <p className="text-sm text-muted-foreground">
                {b.type === "puzzle"
                  ? "Open to play a puzzle."
                  : "Reflect and choose a theme."}
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setOpenBook(b.id)}
                  className="px-3 py-1 rounded bg-primary/20 text-primary"
                >
                  Open
                </button>
                <DreamFragment
                  id={`frag-lib-${b.id}`}
                  className="absolute -top-2 -right-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* book modal */}
      {openBook && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70"
          onClick={() => setOpenBook(null)}
        >
          <div
            className="w-[min(900px,95%)] bg-card/90 rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="w-1/2">
                <img
                  src={BOOKS.find((x) => x.id === openBook)!.img}
                  alt="book"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">
                  {BOOKS.find((x) => x.id === openBook)!.title}
                </h3>
                <div className="mt-4">
                  {BOOKS.find((x) => x.id === openBook)!.type === "puzzle" ? (
                    <WordUnscramble answer="Imagination" />
                  ) : (
                    <ReflectionChoice onClose={() => setOpenBook(null)} />
                  )}
                </div>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => setOpenBook(null)}
                    className="px-3 py-1 rounded bg-muted"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
