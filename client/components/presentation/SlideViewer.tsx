import React, { useEffect, useMemo, useRef, useState } from "react";
import { slides as SLIDES, Slide } from "@/data/slides";
import { DreamFragment } from "@/components/game/DreamFragment";
import { useGame } from "@/state/game";
import { RhythmGame } from "@/components/game/RhythmGame";
import { WordUnscramble } from "@/components/game/WordUnscramble";
import { Link, useNavigate } from "react-router-dom";

export function SlideViewer() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const { collectFragment } = useGame();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setIndex((i) => Math.min(i + 1, SLIDES.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Simple touch swipe
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) setIndex((i) => Math.min(i + 1, SLIDES.length - 1));
        else setIndex((i) => Math.max(i - 1, 0));
      }
    };
    el.addEventListener("touchstart", onStart);
    el.addEventListener("touchend", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, []);

  const go = (dir: number) =>
    setIndex((i) => Math.min(Math.max(i + dir, 0), SLIDES.length - 1));

  const handleHotspot = (hs: Slide["hotspots"][0]) => {
    if (!hs) return;
    if (hs.action === "collect") {
      collectFragment(hs.id);
    }
    if (hs.action === "link") {
      // simple heuristic: open islands
      navigate("/islands");
    }
    if (hs.action === "game-rhythm") {
      setIndex(SLIDES.findIndex((s) => s.id === "gallery") || 0);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-lg overflow-hidden border border-border/50 bg-card/60"
    >
      <div className="w-full aspect-[16/9] relative">
        <img
          src={slide.bg}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <header>
            <h2 className="text-3xl font-extrabold text-primary">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
            )}
          </header>

          <div className="max-w-2xl">
            <p className="text-lg text-foreground/90">{slide.body}</p>
            {slide.contentType === "video" && slide.videoUrl && (
              <div className="mt-4">
                <video
                  controls
                  src={slide.videoUrl}
                  className="w-full rounded-md shadow-lg"
                />
              </div>
            )}
            {slide.contentType === "game" && slide.game === "rhythm" && (
              <div className="mt-4 bg-background/60 p-3 rounded">
                {" "}
                <RhythmGame />{" "}
              </div>
            )}
            {slide.contentType === "game" && slide.game === "unscramble" && (
              <div className="mt-4 bg-background/60 p-3 rounded">
                {" "}
                <WordUnscramble answer="Imagination" />{" "}
              </div>
            )}
          </div>
        </div>

        {/* hotspots */}
        {slide.hotspots?.map((h) => (
          <button
            key={h.id}
            onClick={() => handleHotspot(h)}
            className="absolute border border-primary/40 bg-gradient-to-tr from-primary/20 to-accent/10 rounded-full shadow-lg backdrop-blur-sm hover:scale-105 transform transition-all animate-pulse"
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              width: `${h.w}%`,
              height: `${h.h}%`,
            }}
            aria-label={`Crystal hotspot ${h.id}`}
          />
        ))}

        {/* small floating fragment icons for quick collect */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          {/* show a fragment collector for current slide */}
          <div className="w-10 h-10">
            <DreamFragment id={`frag-slide-${slide.id}`} />
          </div>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => go(-1)}
            className="px-3 py-1.5 rounded-md bg-gradient-to-br from-muted to-muted/80"
          >
            ← Previous Realm
          </button>
          <button
            onClick={() => go(1)}
            className="px-3 py-1.5 rounded-md bg-gradient-to-br from-muted to-muted/80"
          >
            Next Realm →
          </button>
          <div className="ml-4 text-sm text-muted-foreground">
            Realm {index + 1} of {SLIDES.length}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/islands"
            className="text-sm px-3 py-1 rounded-md bg-primary/20 text-primary"
          >
            Enter Map
          </Link>
          <Link
            to="/gallery"
            className="text-sm px-3 py-1 rounded-md bg-secondary text-secondary-foreground"
          >
            Enter Galleries
          </Link>
        </div>
      </div>

      <div className="border-t border-border/30 p-3 overflow-x-auto">
        <div className="flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className={`w-36 flex-shrink-0 rounded-md overflow-hidden border ${i === index ? "ring-2 ring-primary" : ""}`}
            >
              <img src={s.bg} className="w-full h-20 object-cover" />
              <div className="p-2 text-xs text-muted-foreground">{s.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
