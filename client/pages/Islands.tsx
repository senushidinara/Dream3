import { useState } from "react";
import { DreamFragment } from "@/components/game/DreamFragment";
import { useGame } from "@/state/game";
import ThreeScene from "@/components/presentation/ThreeScene";
import { slides as SLIDES } from "@/data/slides";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MemoryOrbs from "@/components/world/MemoryOrbs";
import PortalCard, { Portal } from "@/components/world/PortalCard";

const ISLANDS = [
  {
    id: "island-1",
    name: "Clarity Cay",
    riddle: "I speak without a mouth and hear without ears. What am I?",
    answer: "echo",
  },
  {
    id: "island-2",
    name: "Courage Cove",
    riddle: "What can fill a room but takes up no space?",
    answer: "light",
  },
  {
    id: "island-3",
    name: "Wonder Wharf",
    riddle: "What has keys but can't open locks?",
    answer: "piano",
  },
  {
    id: "island-4",
    name: "Focus Fjord",
    riddle: "The more of this there is, the less you see. What is it?",
    answer: "darkness",
  },
  {
    id: "island-5",
    name: "Joy Junction",
    riddle: "What is always in front of you but can’t be seen?",
    answer: "future",
  },
  {
    id: "island-6",
    name: "Vision Vale",
    riddle: "What runs but never walks?",
    answer: "water",
  },
];

function Crystal({ unlocked }: { unlocked: boolean }) {
  return (
    <div className="relative w-20 h-20">
      <div
        className={`absolute inset-0 ${unlocked ? "opacity-100" : "opacity-60"}`}
      >
        <div className="absolute inset-0 rounded-lg rotate-45 bg-gradient-to-br from-primary to-accent shadow-xl" />
        <div className="absolute -inset-2 blur-2xl bg-primary/30" />
      </div>
      {!unlocked && (
        <div className="absolute inset-0 grid place-items-center text-xs font-semibold">
          Locked
        </div>
      )}
    </div>
  );
}

export default function Islands() {
  const { unlockedIslands, unlockIsland, awardShard } = useGame();
  const [openId, setOpenId] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");

  const open = ISLANDS.find((i) => i.id === openId);

  const submit = () => {
    if (!open) return;
    if (answer.trim().toLowerCase() === open.answer.toLowerCase()) {
      unlockIsland(open.id);
      awardShard(1);
      setOpenId(null);
      setAnswer("");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{ height: 360 }}
        >
          <ThreeScene
            images={[
              "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F4b659da8a22e4f58841b21f388be5a09?format=webp&width=1600",
              "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F510711956ce145129c1fb0753e6c5230?format=webp&width=1600",
            ]}
            filter="brightness(1.04) saturate(1.08)"
          />

          {/* interactive thumbnails */}
          {[
            {
              id: "is-1",
              x: 18,
              y: 30,
              img: SLIDES.find((s) => s.id === "islands")?.images?.[0] || "",
            },
            {
              id: "is-2",
              x: 40,
              y: 18,
              img: SLIDES.find((s) => s.id === "gallery")?.images?.[0] || "",
            },
            {
              id: "is-3",
              x: 62,
              y: 36,
              img: SLIDES.find((s) => s.id === "library")?.images?.[0] || "",
            },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setOpenId(t.id)}
              className="absolute rounded-lg overflow-hidden border border-border/30 shadow-lg"
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: 120,
                height: 80,
              }}
            >
              <img
                src={t.img}
                alt="island"
                className="w-full h-full object-cover"
              />
            </button>
          ))}

          <div className="absolute inset-0 p-8 flex items-end">
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Dream Islands
              </h1>
              <p className="text-white/85 mt-2 max-w-2xl">
                Touch a crystal to enter. Solve the riddle to unlock the island
                and gain a vision shard.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {ISLANDS.map((i) => (
            <div
              key={i.id}
              className="group relative rounded-xl border border-border/50 p-4 bg-card/60 grid place-items-center"
            >
              <button
                onClick={() => setOpenId(i.id)}
                className="grid place-items-center"
              >
                <Crystal unlocked={!!unlockedIslands[i.id]} />
                <p className="mt-3 text-sm font-medium">{i.name}</p>
              </button>
              <DreamFragment
                id={`frag-${i.id}`}
                className="absolute -top-2 -right-2"
              />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{open?.name}</DialogTitle>
            <DialogDescription>Answer to enter.</DialogDescription>
          </DialogHeader>
          <p className="mt-2">{open?.riddle}</p>
          <div className="mt-4 flex items-center gap-2">
            <input
              autoFocus
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Your answer"
              className="flex-1 px-3 py-2 rounded-md bg-background border focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={submit}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
            >
              Unlock
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
