import { Link } from "react-router-dom";
import { DreamFragment } from "@/components/game/DreamFragment";
import { RhythmGame } from "@/components/game/RhythmGame";
import { WordUnscramble } from "@/components/game/WordUnscramble";
import { useGame } from "@/state/game";

function FloatingIsland({ className = "" }: { className?: string }) {
  return (
    <div className={"absolute " + className}>
      <div className="relative w-40 h-24">
        <div className="absolute inset-0 bg-gradient-to-b from-muted to-muted/60 rounded-2xl shadow-lg" />
        <div className="absolute -top-3 left-6 w-10 h-10 rotate-45 bg-gradient-to-br from-primary to-accent rounded-sm shadow-xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute -top-1 right-8 w-6 h-6 rotate-45 bg-gradient-to-br from-secondary to-primary rounded-sm shadow-xl animate-[float_6s_ease-in-out_infinite] [animation-delay:1.2s]" />
      </div>
    </div>
  );
}

export default function Index() {
  const { fragments, shards, keys } = useGame();
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-background to-background/40">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-14">
          <div className="relative">
            <FloatingIsland className="left-[-2rem] top-[-2rem] opacity-50" />
            <FloatingIsland className="right-[-3rem] top-[-1rem] opacity-50" />
            <FloatingIsland className="left-[10%] top-[6rem] opacity-40" />
            <DreamFragment id="frag-hero-1" className="absolute top-6 right-6" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-primary via-accent to-secondary">
              The Mind Palace
            </h1>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              A living world of imagination. Explore dreamscapes, interact with living artifacts, and collect fragments that shape your journey.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/islands" className="px-5 py-2.5 rounded-md bg-gradient-to-r from-primary to-accent text-primary-foreground shadow hover:shadow-lg">Explore Islands</Link>
              <Link to="/gallery" className="px-5 py-2.5 rounded-md bg-secondary text-secondary-foreground hover:opacity-90">Visit Galleries</Link>
              <Link to="/library" className="px-5 py-2.5 rounded-md bg-muted hover:bg-muted/80">Memory Library</Link>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">Progress • {fragments} Fragments · {shards} Shards · {keys} Keys</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border/50 p-6 bg-card/50">
            <div className="text-sm font-semibold tracking-wide text-primary">1. Explore</div>
            <h3 className="mt-2 text-xl font-bold">Floating Dreamscapes</h3>
            <p className="mt-2 text-sm text-muted-foreground">Navigate shimmering islands. Touch a crystal to enter — but first, answer its riddle.</p>
            <div className="mt-4 flex gap-2">
              <Link className="px-3 py-1.5 rounded-md bg-primary/20 text-primary" to="/islands">Open Map →</Link>
            </div>
          </div>
          <div className="rounded-2xl border border-border/50 p-6 bg-card/50">
            <div className="text-sm font-semibold tracking-wide text-primary">2. Interact</div>
            <h3 className="mt-2 text-xl font-bold">Passion Galleries</h3>
            <p className="mt-2 text-sm text-muted-foreground">Objects are portals. Play a short rhythm or paint with color to reveal hidden art.</p>
            <div className="mt-4">
              <RhythmGame />
            </div>
          </div>
          <div className="rounded-2xl border border-border/50 p-6 bg-card/50">
            <div className="text-sm font-semibold tracking-wide text-primary">3. Reflect</div>
            <h3 className="mt-2 text-xl font-bold">Memory Library</h3>
            <p className="mt-2 text-sm text-muted-foreground">Solve a memory puzzle or choose a reflection that resonates. Keys open secret chambers.</p>
            <div className="mt-4">
              <WordUnscramble answer="Insight" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="rounded-2xl border border-border/50 p-8 bg-card/40 relative overflow-hidden">
          <div className="absolute -inset-40 bg-[radial-gradient(600px_200px_at_80%_-10%,hsl(var(--accent)/.25),transparent)]" />
          <h3 className="text-2xl font-extrabold">Dream Fragments</h3>
          <p className="mt-2 text-foreground/80 max-w-2xl">Hidden across all islands, galleries, and tomes. Gather enough and watch your Dream Constellation Map ignite with light.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/constellation" className="px-4 py-2 rounded-md bg-gradient-to-r from-primary to-accent text-primary-foreground">View Constellation</Link>
            <Link to="/gallery" className="px-4 py-2 rounded-md bg-muted hover:bg-muted/80">Search the Galleries</Link>
          </div>
          <DreamFragment id="frag-home-1" className="absolute right-10 top-10" />
          <DreamFragment id="frag-home-2" className="absolute left-10 bottom-10" />
        </div>
      </section>
    </div>
  );
}
