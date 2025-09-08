export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-2 text-sm text-foreground/70">
        <p>© {new Date().getFullYear()} The Mind Palace</p>
        <p>Every interaction is a discovery. Every fragment is growth.</p>
      </div>
    </footer>
  );
}
