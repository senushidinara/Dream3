import React, { useEffect, useRef } from "react";

/**
 * Floating memory orbs overlay. Renders soft-moving bubbles with images inside.
 * Add multiple images to create depth. Uses canvas for performance.
 */
export default function MemoryOrbs({
  images,
  density = 14,
  speed = 0.15,
}: {
  images: string[];
  density?: number;
  speed?: number; // base upward speed in px/frame
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.width = canvas.clientWidth * devicePixelRatio;
      h = canvas.height = canvas.clientHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const textures: HTMLImageElement[] = [];
    images.forEach((src) => {
      const im = new Image();
      im.crossOrigin = "anonymous";
      im.src = src;
      textures.push(im);
    });

    type Orb = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      img: HTMLImageElement;
      rot: number;
    };

    let orbs: Orb[] = [];
    const spawn = (n = density) => {
      orbs = Array.from({ length: n }).map(() => {
        const img = textures[Math.floor(Math.random() * textures.length)];
        return {
          x: Math.random() * canvas.clientWidth,
          y: canvas.clientHeight + Math.random() * canvas.clientHeight,
          r: Math.random() * 26 + 18,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -(Math.random() * 0.2 + speed),
          img,
          rot: Math.random() * Math.PI * 2,
        } as Orb;
      });
    };

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      // dreamy background glow
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight);
      gradient.addColorStop(0, "rgba(255,255,255,0.04)");
      gradient.addColorStop(1, "rgba(255,255,255,0.00)");
      ctx.fillStyle = gradient as unknown as string;
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      orbs.forEach((o) => {
        o.x += o.vx;
        o.y += o.vy;
        o.rot += 0.0015;
        if (o.y < -o.r * 2) {
          o.y = canvas.clientHeight + o.r * 2;
          o.x = Math.random() * canvas.clientWidth;
        }

        // orb halo
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 1.6);
        g.addColorStop(0, "rgba(255,255,255,0.15)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g as unknown as string;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r * 1.6, 0, Math.PI * 2);
        ctx.fill();

        // inner image clipped in a circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        if (o.img.complete) {
          const s = o.r * 2.4; // scale image a bit larger than circle
          ctx.translate(o.x, o.y);
          ctx.rotate(o.rot);
          ctx.drawImage(o.img, -s / 2, -s / 2, s, s);
          ctx.rotate(-o.rot);
          ctx.translate(-o.x, -o.y);
        }
        ctx.restore();

        // glossy ring
        ctx.strokeStyle = "rgba(255,255,255,0.28)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r - 0.6, 0, Math.PI * 2);
        ctx.stroke();
      });

      raf = requestAnimationFrame(loop);
    };

    resize();
    spawn();
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [images.join("|"), density, speed]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
