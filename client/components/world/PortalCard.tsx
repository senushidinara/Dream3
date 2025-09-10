import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DreamFragment } from "@/components/game/DreamFragment";

export type Portal = {
  id: string;
  title: string;
  image: string; // thumbnail or door image
  media?: {
    type: "image" | "video";
    src: string;
  }[];
  description?: string;
};

export default function PortalCard({ portal, enterTo, onEnter }: { portal: Portal; enterTo?: string; onEnter?: () => void }) {
  const [open, setOpen] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
  const active = portal.media?.[mediaIndex];

  return (
    <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/60">
      <button onClick={() => setOpen(true)} className="group w-full text-left">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={portal.image}
            alt={portal.title}
            className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          <div className="absolute left-3 bottom-3">
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-background/70 border border-border/50 text-xs">
              <span>Enter</span>
              <span aria-hidden>→</span>
            </div>
          </div>
        </div>
        <div className="p-3">
          <div className="font-semibold leading-tight">{portal.title}</div>
          {portal.description && (
            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {portal.description}
            </div>
          )}
        </div>
      </button>

      <DreamFragment
        id={`frag-${portal.id}`}
        className="absolute -top-2 -right-2"
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{portal.title}</DialogTitle>
            {portal.description && (
              <DialogDescription>{portal.description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="mt-2">
            {active?.type === "video" ? (
              <video
                controls
                src={active.src}
                className="w-full rounded-md bg-black max-h-[60vh] object-contain"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={active?.src || portal.image}
                alt={portal.title}
                className="w-full rounded-md max-h-[60vh] object-contain"
              />
            )}
          </div>
          {portal.media && portal.media.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {portal.media.map((m, i) => (
                <button
                  key={`${portal.id}-${i}`}
                  onClick={() => setMediaIndex(i)}
                  className={`px-2 py-1 rounded text-xs border ${i === mediaIndex ? "bg-primary text-primary-foreground border-transparent" : "bg-muted border-border/50"}`}
                >
                  {m.type === "video" ? "Clip " : "Shot "}
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
