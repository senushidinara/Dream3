import { useGame } from "@/state/game";

const STARS = [
  { id: "start", x: 10, y: 80, req: 0 },
  { id: "fragments", x: 30, y: 60, req: 2 },
  { id: "islands", x: 50, y: 40, req: 2 },
  { id: "gallery", x: 70, y: 55, req: 1 },
  { id: "library", x: 60, y: 75, req: 1 },
  { id: "ascend", x: 85, y: 35, req: 5 },
];

const LINKS: Array<[string, string]> = [
  ["start", "fragments"],
  ["fragments", "islands"],
  ["islands", "gallery"],
  ["gallery", "ascend"],
  ["islands", "library"],
  ["library", "ascend"],
];

export default function Constellation() {
  const { fragments, shards, keys } = useGame();
  const power = fragments + shards + keys; // simple aggregate

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-background to-background/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Dream Constellation
        </h1>
        <p className="text-muted-foreground mt-2">
          Your journey traced in stars. Nodes glow as your fragments, shards,
          and keys grow.
        </p>

        <div className="mt-8 rounded-2xl border border-border/50 bg-card/40 overflow-hidden">
          <svg
            viewBox="0 0 100 60"
            className="w-full aspect-[5/3] bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/.15),transparent_60%)]"
          >
            {LINKS.map(([a, b], idx) => {
              const A = STARS.find((s) => s.id === a)!;
              const B = STARS.find((s) => s.id === b)!;
              return (
                <line
                  key={idx}
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke="hsl(var(--primary))"
                  strokeOpacity="0.3"
                  strokeWidth="0.4"
                />
              );
            })}
            {STARS.map((s) => {
              const lit = power >= s.req;
              return (
                <g key={s.id}>
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={lit ? 2.6 : 1.8}
                    fill={
                      lit
                        ? "hsl(var(--accent))"
                        : "hsl(var(--muted-foreground))"
                    }
                  />
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={6}
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeOpacity={lit ? 0.35 : 0}
                  />
                  <text
                    x={s.x + 2.5}
                    y={s.y - 1}
                    fontSize={2.2}
                    fill="currentColor"
                    className="fill-foreground/80"
                  >
                    {s.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Progress: {power} power • {fragments} fragments • {shards} shards •{" "}
          {keys} keys
        </div>
      </div>
    </div>
  );
}
