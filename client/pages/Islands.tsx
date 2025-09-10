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

const PORTALS: Portal[] = [
  {
    id: "portal-infinity-bridge",
    title: "Bridge to Infinity",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2Fc16d058f39fa481caaed0b57754b6d48?format=webp&width=800",
    media: [
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2Ffc8d0fde2a1942049615e99b50c80de9?format=webp&width=1200" },
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F42cbfa7a8c6c4139877a4663f3da030c?format=webp&width=1200" },
    ],
    description: "A massive shimmering portal of light stretching into the stars.",
  },
  {
    id: "portal-main-hall",
    title: "Crystal Main Hall",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2Ff01713cd137b45a79d7306734a1458d6?format=webp&width=800",
    media: [
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2Ff943fd8e7eae492584743c133e1abac4?format=webp&width=1200" },
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F366178ae2e1b433bbfe03425ec116ca9?format=webp&width=1200" },
    ],
    description: "A vast glowing hall of crystal marble with floating staircases.",
  },
  {
    id: "portal-garden",
    title: "Garden of Moments",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F9673c618b64e4a47a5d5ed839fe85937?format=webp&width=800",
    media: [
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F03aadb62bbe342d2a51c3eb2dcb243a4?format=webp&width=1200" },
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2Fb182989ba01349da98890866d3cb4dbc?format=webp&width=1200" },
    ],
    description: "A nature path of glowing flowers and lanterns — serene and warm.",
  },
  {
    id: "portal-orbs",
    title: "Memory Orbs",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F5e1364504e284621b0559def79059088?format=webp&width=800",
    media: [
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F63f78bf8ed984f56956557af793c22b8?format=webp&width=1200" },
      { type: "video", src: "https://cdn.builder.io/o/assets%2F83b5046001d2448094e92a95add784c0%2F290c9bf601394ac78b52305d02e18779?alt=media&token=d1f4a176-a677-4ca6-ba9a-fe9d2710d82f&apiKey=83b5046001d2448094e92a95add784c0" },
    ],
    description: "Floating orbs holding tiny living memories — touch to listen.",
  },
  {
    id: "portal-doors-gold",
    title: "Golden Transformation Door",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2Fbe652d8347ab42ad81f134b01e245844?format=webp&width=800",
    media: [
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2Fa4ec6c9ae6024b9ba436e795f137c17d?format=webp&width=1200" },
    ],
    description: "A radiant golden door engraved with phoenix and butterflies.",
  },
  {
    id: "portal-vision-door",
    title: "Vision Room Door",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2Fe5383d9434f445e6918feb4640836503?format=webp&width=800",
    media: [
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F717d269214dd4b09961965f142747a27?format=webp&width=1200" },
    ],
    description: "A transparent door showing shifting futures — choose a path.",
  },
  {
    id: "portal-paintings",
    title: "Hall of Paintings",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F5fe96626e4ff407686c995eaecff0b52?format=webp&width=800",
    media: [
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F55a943c2f8e34162a9dea70ca4053e44?format=webp&width=1200" },
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2Fafeea6fc467f4ad2ae55cf68a88d67ae?format=webp&width=1200" },
    ],
    description: "Walls of living color — canvases shift and breathe.",
  },
  {
    id: "portal-stair",
    title: "Staircases of Light",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2Fabb11e68f9f24b9d90df93e50fec0df9?format=webp&width=800",
    media: [
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F4fd0f1b32f114e17bea7baac9bd79d85?format=webp&width=1200" },
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F5e629caaf6724638bdc329b1a61f0316?format=webp&width=1200" },
    ],
    description: "Elegant floating stairs connecting realms.",
  },
  {
    id: "portal-constellation",
    title: "Constellation Gate",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F9507e2d435d846199ebdff41a8283c95?format=webp&width=800",
    media: [
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2Fd7e66eba30794d0ca633d52af1623402?format=webp&width=1200" },
    ],
    description: "A celestial arch that opens to starfields and maps.",
  },
];

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
              "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F3d3bb36c424543288c2484383800e261?format=webp&width=1600",
              "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F369f2f71f3a44f64b6c4114234b83f5e?format=webp&width=1600",
            ]}
            filter="brightness(1.04) saturate(1.08)"
          />
          <MemoryOrbs
            images={[
              "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F5e1364504e284621b0559def79059088?format=webp&width=600",
              "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F63f78bf8ed984f56956557af793c22b8?format=webp&width=600",
              "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F5e3bcf0f342a4699953f7a21f6369f50?format=webp&width=600",
            ]}
            density={16}
            speed={0.12}
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
