import React, { useEffect, useRef, useState } from "react";
import { slides as SLIDES, Slide } from "@/data/slides";
import { DreamFragment } from "@/components/game/DreamFragment";
import { useGame } from "@/state/game";
import { RhythmGame } from "@/components/game/RhythmGame";
import { WordUnscramble } from "@/components/game/WordUnscramble";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

function VideoGallery({ urls }: { urls: string[] }) {
  const [i, setI] = useState(0);
  if (!urls || urls.length === 0) return null;
  return (
    <div>
      <video
        controls
        src={urls[i]}
        className="w-full rounded-md shadow-lg h-64 object-cover bg-black"
      />
      <div className="mt-2 flex gap-2">
        {urls.map((u, idx) => (
          <button
            key={u}
            onClick={() => setI(idx)}
            className={`px-2 py-1 rounded ${idx === i ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            Clip {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SlideViewer() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const game = useGame();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, SLIDES.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // touch swipe
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

  const go = (dir: number) => setIndex((i) => Math.min(Math.max(i + dir, 0), SLIDES.length - 1));

  // parallax
  const [px, setPx] = useState(0);
  const [py, setPy] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const nx = (mx / rect.width - 0.5) * 2;
      const ny = (my / rect.height - 0.5) * 2;
      setPx(nx);
      setPy(ny);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  // visual filters and particles
  const [filter, setFilter] = useState("");
  const [particlesOn, setParticlesOn] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let raf = 0;
    let particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.width = canvas.clientWidth * devicePixelRatio;
      h = canvas.height = canvas.clientHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const spawn = (n = 60) => {
      particles = Array.from({ length: n }).map(() => ({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.3 - 0.05,
        r: Math.random() * 3 + 1,
        a: Math.random() * 0.6 + 0.2,
      }));
    };

    const loop = () => {
      if (!particlesOn) return;
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) p.y = canvas.clientHeight + 10;
        if (p.x < -10) p.x = canvas.clientWidth + 10;
        if (p.x > canvas.clientWidth + 10) p.x = -10;
        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        g.addColorStop(0, `rgba(255,255,255,${p.a})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g as unknown as string;
        ctx.fillRect(p.x - p.r * 8, p.y - p.r * 8, p.r * 16, p.r * 16);
      });
      raf = requestAnimationFrame(loop);
    };

    if (particlesOn) {
      resize();
      spawn(80);
      raf = requestAnimationFrame(loop);
      window.addEventListener("resize", resize);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [particlesOn]);

  // ambient sound + effect nodes
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const delayRef = useRef<DelayNode | null>(null);
  const feedbackRef = useRef<GainNode | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [reverbOn, setReverbOn] = useState(false);

  const setupAudio = (withEffect = false) => {
    if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioCtxRef.current!;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 220;
    gain.gain.value = 0.0025;

    if (withEffect) {
      const delay = ctx.createDelay();
      delay.delayTime.value = 0.25; // 250ms
      const feedback = ctx.createGain();
      feedback.gain.value = 0.4;
      // Connect: osc -> gain -> delay -> feedback -> delay -> destination (and direct)
      gain.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(ctx.destination);
      gain.connect(ctx.destination);
      delayRef.current = delay;
      feedbackRef.current = feedback;
    } else {
      gain.connect(ctx.destination);
    }

    osc.connect(gain);
    osc.start();
    oscRef.current = osc;
    gainRef.current = gain;
    setSoundOn(true);
  };

  const teardownAudio = () => {
    oscRef.current?.stop();
    oscRef.current?.disconnect();
    gainRef.current?.disconnect();
    delayRef.current?.disconnect();
    feedbackRef.current?.disconnect();
    oscRef.current = null;
    gainRef.current = null;
    delayRef.current = null;
    feedbackRef.current = null;
    setSoundOn(false);
  };

  const toggleSound = async () => {
    if (!soundOn) setupAudio(reverbOn);
    else teardownAudio();
  };

  useEffect(() => {
    // when reverbOn toggles while sound is playing, rebuild nodes
    if (!audioCtxRef.current) return;
    if (!soundOn) return;
    teardownAudio();
    setupAudio(reverbOn);
  }, [reverbOn]);


  const handleHotspot = (hs: Slide["hotspots"][0]) => {
    if (!hs) return;
    if (hs.action === "collect") {
      if (!game.collected[hs.id]) {
        game.collectFragment(hs.id);
        // toast
        toast({ title: "Dream Fragment", description: "You found a shimmering fragment!" });
        const newFragments = game.fragments + 1;
        if (newFragments > 0 && newFragments % 3 === 0) {
          game.awardShard(1);
          toast({ title: "Vision Shard", description: "A vision shard glows — you gained a shard!" });
        }
      } else {
        toast({ title: "Already collected", description: "This fragment has already been collected." });
      }
    }

    if (hs.action === "link") {
      if (hs.id === "islands") navigate("/islands");
      else if (hs.id === "gallery") navigate("/gallery");
      else if (hs.id === "library") navigate("/library");
      else if (hs.id === "constellation") navigate("/constellation");
      else navigate("/islands");
    }

    if (hs.action === "game-rhythm") {
      navigate("/gallery");
    }
  };

  return (
    <div ref={containerRef} className="relative rounded-lg overflow-hidden border border-border/50 bg-card/60">
      <div className="w-full aspect-[16/9] relative">
        <img
          src={slide.bg}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover transform transition-transform will-change-transform"
          style={{ transform: `translate3d(${px * 8}px, ${py * 6}px, 0) scale(${1 + Math.abs(px) * 0.02 + Math.abs(py) * 0.02})`, filter: filter }}
        />

        {/* subtle particle overlay */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.02),transparent_10%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.02),transparent_10%)]" />
        </div>

        <div className="absolute inset-0 bg-black/28" style={{ backdropFilter: "blur(2px)" }} />

        <div className="absolute inset-0 p-8 flex items-start">
          {/* Left info panel to ensure contrast and readability */}
          <div className="pointer-events-auto max-w-md w-full bg-[rgba(10,8,14,0.78)] backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/8 z-20">
            <header>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary leading-snug" style={{ lineHeight: 1.12, letterSpacing: "0.2px" }}>{slide.title}</h2>
              {slide.subtitle && <p className="mt-2 text-sm text-muted-foreground" style={{ lineHeight: 1.3 }}>{slide.subtitle}</p>}
            </header>

            <div className="mt-4">
              <p className="text-base md:text-lg text-foreground/95" style={{ lineHeight: 1.45, letterSpacing: "0.25px", textShadow: "none", hyphens: "none" }}>{slide.body}</p>

              {slide.contentType === "video" && (slide.videoUrls || slide.videoUrl) && (
                <div className="mt-4">
                  {slide.videoUrls ? <VideoGallery urls={slide.videoUrls} /> : <video controls src={slide.videoUrl} className="w-full rounded-md shadow-lg" />}
                </div>
              )}

              {slide.contentType === "game" && slide.game === "rhythm" && (
                <div className="mt-4 bg-background/60 p-3 rounded pointer-events-auto">
                  <RhythmGame />
                </div>
              )}

              {slide.contentType === "game" && slide.game === "unscramble" && (
                <div className="mt-4 bg-background/60 p-3 rounded pointer-events-auto">
                  <WordUnscramble answer="Imagination" />
                </div>
              )}
            </div>
          </div>

          {/* optional right spacer to keep layout balanced */}
          <div className="flex-1" />
        </div>

        {/* hotspots */}
        {slide.hotspots?.map((h) => (
          <button
            key={h.id}
            onClick={() => handleHotspot(h)}
            className="absolute border border-primary/40 bg-gradient-to-tr from-primary/20 to-accent/10 rounded-full shadow-lg backdrop-blur-sm hover:scale-105 transform transition-all animate-pulse"
            style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
            aria-label={`Crystal hotspot ${h.id}`}
          />
        ))}

        <div className="absolute right-4 top-4 flex flex-col gap-2 pointer-events-auto">
          <div className="w-10 h-10">
            <DreamFragment id={`frag-slide-${slide.id}`} />
          </div>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => go(-1)} className="px-3 py-1.5 rounded-md bg-gradient-to-br from-muted to-muted/80">← Previous Realm</button>
          <button onClick={() => go(1)} className="px-3 py-1.5 rounded-md bg-gradient-to-br from-muted to-muted/80">Next Realm →</button>
          <div className="ml-4 text-sm text-muted-foreground">Realm {index + 1} of {SLIDES.length}</div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleSound} className="text-sm px-3 py-1 rounded-md bg-primary/10">{soundOn ? "🔊 Ambient On" : "🔈 Ambient Off"}</button>
          <Link to="/islands" className="text-sm px-3 py-1 rounded-md bg-primary/20 text-primary">Enter Map</Link>
          <Link to="/gallery" className="text-sm px-3 py-1 rounded-md bg-secondary text-secondary-foreground">Enter Galleries</Link>
        </div>
      </div>

      <div className="border-t border-border/30 p-3">
        <div className="w-full flex items-center justify-center">
          <svg viewBox="0 0 300 80" className="w-full max-w-2xl">
            {SLIDES.map((s, i) => {
              const x = 20 + i * (240 / Math.max(SLIDES.length - 1, 1));
              const y = 40 + Math.sin(i * 0.8 + index * 0.4) * 10;
              const lit = !!game.collected[`frag-slide-${s.id}`] || i <= index;
              return (
                <g key={s.id} onClick={() => setIndex(i)} className="cursor-pointer">
                  <circle cx={x} cy={y} r={lit ? 7 : 4} fill={lit ? "hsl(var(--accent))" : "hsl(var(--muted))"} />
                  <text x={x + 10} y={y + 4} fontSize={10} fill="currentColor" className="text-xs">{s.title}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
