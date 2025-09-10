import React, { useState } from "react";
import { SlideViewer } from "@/components/presentation/SlideViewer";
import PortalCard, { Portal } from "@/components/world/PortalCard";
import { useNavigate } from "react-router-dom";

const DOORS: (Portal & { to: string })[] = [
  {
    id: "door-canvases",
    title: "Moving Canvases",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F6b2015984ce54df795cbdaafd07f2209?format=webp&width=800",
    media: [
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F11ffbe2d39594e71a56c1cdbdb9004a7?format=webp&width=1200" },
    ],
    description: "A gallery where the art is alive and interactive.",
    to: "/gallery",
  },
  {
    id: "door-shelves",
    title: "Endless Library",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F5a76eb8d10b8406c9fd9b208725d6124?format=webp&width=800",
    media: [
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2Fac5db0118c2c489b818f914516c113ad?format=webp&width=1200" },
    ],
    description: "Puzzles and reflections hidden between glowing tomes.",
    to: "/library",
  },
  {
    id: "door-garden",
    title: "Dream Garden",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F73b70f44dc2345898716d28d84608f27?format=webp&width=800",
    media: [
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2Fbde79fa1a170404caea0074db1092cd3?format=webp&width=1200" },
    ],
    description: "Follow the stepping stones deeper into wonder.",
    to: "/garden",
  },
  {
    id: "door-constellation",
    title: "Constellation Gate",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F68844f1d93f641599cc687603fcbb12f?format=webp&width=800",
    media: [
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F6177f1b7b42645e78b4bf02746e38d94?format=webp&width=1200" },
    ],
    description: "Chart your progress among the stars.",
    to: "/constellation",
  },
  {
    id: "door-islands",
    title: "Dream Islands",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2Fd79271738b0b4c32b78ec0c33a72859e?format=webp&width=800",
    media: [
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F4c246c0a2a454843abaf0945f49558be?format=webp&width=1200" },
      { type: "image", src: "https://cdn.builder.io/api/v1/image/assets%2F83b5046001d2448094e92a95add784c0%2F2166303d17cf47ffac6e5cd8fb97833f?format=webp&width=1200" },
    ],
    description: "Unlock riddles and collect vision shards across islands.",
    to: "/islands",
  },
];

export default function Presentation() {
  const nav = useNavigate();
  const [travel, setTravel] = useState(false);

  const enter = (to: string) => {
    setTravel(true);
    setTimeout(() => nav(to), 420);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-background to-background/40 relative">
      {travel && (
        <div className="pointer-events-none fixed inset-0 z-50 animate-[pulse_420ms_ease-out] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95),rgba(255,255,255,0)_60%)]" />
      )}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight">The Mind Palace — Quest</h1>
        <p className="text-muted-foreground mt-2">
          Choose a door or roam scenes. Open portals, solve puzzles, collect fragments — travel like walking inside a living palace.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOORS.map((d) => (
            <PortalCard
              key={d.id}
              portal={d}
              enterTo={d.to}
              onEnter={() => enter(d.to)}
            />
          ))}
        </div>

        <div className="mt-10">
          <SlideViewer />
        </div>
      </div>
    </div>
  );
}
