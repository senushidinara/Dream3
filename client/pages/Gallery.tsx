import { RhythmGame } from "@/components/game/RhythmGame";
import { DreamFragment } from "@/components/game/DreamFragment";
import React, { useState, useEffect, useRef } from "react";
import ThreeScene from "@/components/presentation/ThreeScene";
import Stardust from "@/components/ui/Stardust";

function ColorRevealNew() {
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);

  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const img = imgRef.current!;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width = canvas.clientWidth * devicePixelRatio;
      canvas.height = canvas.clientHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.drawImage(img, 0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.fillStyle = "rgba(0,0,0,0.86)";
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    };
    img.onload = resize;
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const reveal = (x: number, y: number) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const r = Math.max(32, Math.min(80, canvas.clientWidth * 0.06));
    ctx.globalCompositeOperation = "destination-out";
    const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, "rgba(0,0,0,1)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd as any;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    setRevealedCount((c) => c + 1);
  };

  return (
    <div className="rounded-xl border border-border/50 p-4 bg-card/60">
      <h4 className="font-semibold">Canvas Reveal</h4>
      <p className="text-sm text-muted-foreground">
        Click or tap the canvas to reveal parts of the painting. Reveal 6 spots
        to finish.
      </p>
      <div className="mt-4 grid grid-cols-5 gap-4 items-center">
        <div className="col-span-4 relative">
          <div className="aspect-[16/9] rounded-lg overflow-hidden border bg-black relative">
            <img
              ref={imgRef}
              src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F8a3edb97228b4bacb141c98b664026a4?format=webp&width=1200"
              alt="canvas"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              onClick={(e) => {
                const rect = (
                  e.target as HTMLCanvasElement
                ).getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                reveal(x, y);
              }}
            />
          </div>
        </div>
        <div className="col-span-1 grid gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary via-accent to-secondary shadow-lg grid place-items-center text-white font-bold">
            Orb
          </div>
          <div className="text-xs text-primary">Reveals: {revealedCount}</div>
        </div>
      </div>
    </div>
  );
}

function ColorReveal() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="rounded-xl border border-border/50 p-4 bg-card/60">
      <h4 className="font-semibold">Canvas Reveal</h4>
      <p className="text-sm text-muted-foreground">
        Drag the color orb onto the canvas to reveal the painting.
      </p>
      <div className="mt-4 grid grid-cols-5 gap-4 items-center">
        <div className="col-span-4 relative">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => setRevealed(true)}
            className="aspect-[16/9] rounded-lg overflow-hidden border bg-gradient-to-br from-muted to-muted/60 grid place-items-center"
          >
            {!revealed ? (
              <div className="text-sm text-muted-foreground">
                Drop color here
              </div>
            ) : (
              <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent)/.35),transparent_40%),radial-gradient(circle_at_80%_60%,hsl(var(--secondary)/.35),transparent_35%),linear-gradient(135deg,hsl(var(--primary)/.4),hsl(var(--accent)/.35),hsl(var(--secondary)/.4))]" />
            )}
          </div>
        </div>
        <div className="col-span-1 grid gap-3">
          <div
            draggable
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary via-accent to-secondary shadow-lg cursor-grab active:cursor-grabbing"
          />
          {revealed && <span className="text-xs text-primary">Revealed!</span>}
        </div>
      </div>
    </div>
  );
}

const VIDEO_ASSETS = Array.from(
  new Set([
    "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F692d5f21dc4b4bb39648a8b119e61a53?alt=media&token=cfe784bc-da0e-4bf4-b4b3-8b7651137253&apiKey=dc3782de61224ee6afee73d63ac0f50c",
    "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F26236c4d94594f8497d9c42174c58fa6?alt=media&token=e047f3f6-f2a4-4e5e-98af-d11631ba90a4&apiKey=dc3782de61224ee6afee73d63ac0f50c",
    "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F6263fa8bd8034f829e6d2bd8c59dc641?alt=media&token=2eae1cca-4483-46fc-aaae-8c7945842c0d&apiKey=dc3782de61224ee6afee73d63ac0f50c",
    "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F8e3e780a6d09483caaf0fd85c9ff3eb9?alt=media&token=eceea692-5e5e-4622-9402-b2ed1a8f4ba5&apiKey=dc3782de61224ee6afee73d63ac0f50c",
    // extra video (unique)
    "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F34ffec42bb6e4f4f8e0de4486d645921?alt=media&token=8a3b2e78-930b-4e3b-9e51-e6fb447dfb46&apiKey=dc3782de61224ee6afee73d63ac0f50c",
  ]),
).slice(0, 4);

export default function Gallery() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{ height: 320 }}
        >
          <ThreeScene
            images={[
              "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fc4e7bcb3c490419da0e26370418c5825?format=webp&width=1600",
              "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F4b5244b77f024688823c292f89f8b43d?format=webp&width=1600",
            ]}
            filter="brightness(1.02) saturate(1.08)"
          />
          <div className="absolute inset-0">
            <Stardust intensity={36} color="255,220,210" />
          </div>

          <div className="absolute inset-0 p-8 flex items-end">
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Passion Galleries
              </h1>
              <p className="text-white/95 mt-2 max-w-2xl">
                Each object is a portal. Play, create, and unlock new rooms.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/60 p-4">
            <h4 className="font-semibold">Rhythm Hall</h4>
            <p className="text-sm text-muted-foreground">
              Play the kinetic instruments to reveal a fragment.
            </p>
            <div className="mt-4">
              <RhythmGame />
            </div>
            <DreamFragment
              id="frag-gallery-1"
              className="absolute -top-2 -right-2"
            />
          </div>

          <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/60 p-4">
            <h4 className="font-semibold">Moving Canvases</h4>
            <p className="text-sm text-muted-foreground">
              Interact with the gallery canvases to reveal hidden animations.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {VIDEO_ASSETS.map((v) => (
                <button
                  key={v}
                  onClick={() => setActiveVideo(v)}
                  className="aspect-[16/9] rounded overflow-hidden bg-black/60"
                >
                  <video
                    src={v}
                    className="w-full h-full object-cover"
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                  />
                </button>
              ))}
            </div>
            <DreamFragment
              id="frag-gallery-2"
              className="absolute -top-2 -right-2"
            />
          </div>

          <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/60 p-4">
            <h4 className="font-semibold">Color Reveal</h4>
            <ColorRevealNew />
          </div>
        </div>
      </div>

      {/* video modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80"
          onClick={() => setActiveVideo(null)}
        >
          <video
            src={activeVideo}
            controls
            autoPlay
            muted
            loop
            playsInline
            className="max-w-[80%] max-h-[80%] rounded shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
