import { useGame } from "@/state/game";
import { useNavigate } from "react-router-dom";
import ThreeScene from "@/components/presentation/ThreeScene";
import Stardust from "@/components/ui/Stardust";

const STARS = [
  { id: "start", x: 10, y: 80, req: 0 },
  { id: "fragments", x: 30, y: 60, req: 2 },
  { id: "islands", x: 50, y: 40, req: 2 },
  { id: "gallery", x: 70, y: 55, req: 1 },
  { id: "library", x: 60, y: 75, req: 1 },
  { id: "ascend", x: 85, y: 35, req: 5 },
];

const LINKS = [
  ["start", "fragments"],
  ["fragments", "islands"],
  ["islands", "gallery"],
  ["gallery", "ascend"],
  ["islands", "library"],
  ["library", "ascend"],
] as Array<[string, string]>;

export default function Constellation() {
  const { fragments, shards, keys } = useGame();
  const power = fragments + shards + keys; // simple aggregate
  const navigate = useNavigate();

  const goTo = (id: string) => {
    if (id === "islands") navigate("/islands");
    if (id === "gallery") navigate("/gallery");
    if (id === "library") navigate("/library");
    if (id === "fragments") navigate("/quest");
    if (id === "ascend") navigate("/garden");
  };

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="relative rounded-xl overflow-hidden" style={{ height: 320 }}>
          <ThreeScene
            images={[
              "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F6c64a7bebc8a44c4803722bf6fcfcf77?format=webp&width=1600",
              "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F4a833102f3c346cd8ead3ce79547ebd5?format=webp&width=1600",
            ]}
            filter="brightness(0.9) saturate(1.05)"
          />
          <div className="absolute inset-0">
            <Stardust intensity={26} color="200,220,255" />
          </div>
          <div className="absolute inset-0 p-8 flex items-end">
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">Dream Constellation</h1>
              <p className="text-white/95 mt-2 max-w-2xl">Your journey traced in stars. Nodes glow as your fragments, shards, and keys grow.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-border/50 bg-card/40 overflow-hidden p-4">
          <svg viewBox="0 0 100 60" className="w-full aspect-[5/3] bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/.15),transparent_60%)]">
            {LINKS.map(([a, b], idx) => {
              const A = STARS.find((s) => s.id === a)!;
              const B = STARS.find((s) => s.id === b)!;
              return <line key={idx} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="hsl(var(--primary))" strokeOpacity="0.25" strokeWidth="0.35" />;
            })}

            {STARS.map((s) => {
              const lit = power >= s.req;
              return (
                <g key={s.id} className="cursor-pointer" onClick={() => goTo(s.id)}>
                  <circle cx={s.x} cy={s.y} r={lit ? 3 : 1.8} fill={lit ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))"} />
                  <circle cx={s.x} cy={s.y} r={6} fill="none" stroke="hsl(var(--accent))" strokeOpacity={lit ? 0.35 : 0} />
                  <text x={s.x + 2.5} y={s.y - 1} fontSize={2.2} fill="currentColor" className="fill-foreground/80">
                    {s.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">Progress: {power} power • {fragments} fragments • {shards} shards • {keys} keys</div>
      </div>
    </div>
  );
}
