import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/islands", label: "Islands" },
  { to: "/gallery", label: "Gallery" },
  { to: "/library", label: "Library" },
  { to: "/constellation", label: "Constellation" },
  { to: "/quest", label: "Quest" },
];

export function Header() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="group inline-flex items-center gap-2">
          <span className="relative grid place-items-center w-8 h-8">
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-accent to-secondary blur-sm opacity-80 group-hover:opacity-100 transition" />
            <span className="relative rounded-full bg-background/70 border border-border w-7 h-7 grid place-items-center text-primary">✦</span>
          </span>
          <span className="font-extrabold tracking-tight text-lg">The Mind Palace</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  "px-3 py-1.5 rounded-md text-sm transition",
                  isActive || location.pathname.startsWith(n.to)
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-muted/40 text-foreground/80",
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/constellation"
          className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-gradient-to-r from-primary to-accent text-primary-foreground shadow hover:shadow-lg transition"
        >
          <span>Dream Map</span>
          <span aria-hidden>➜</span>
        </Link>
      </div>
    </header>
  );
}
