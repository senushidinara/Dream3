export type Slide = {
  id: string;
  title?: string;
  subtitle?: string;
  body?: string;
  bg?: string;
  contentType?: "text" | "video" | "game" | "gallery";
  videoUrl?: string;
  videoUrls?: string[];
  game?: "rhythm" | "unscramble";
  hotspots?: Array<{
    x: number;
    y: number;
    w: number;
    h: number;
    action: string;
    id: string;
  }>;
};

export const slides: Slide[] = [
  {
    id: "cover",
    title: "The Mind Palace Quest",
    subtitle: "Worlds of Imagination",
    body: "Explore The Mind Palace for self-discovery and imaginative adventures. Hidden treasures, puzzles, and dream fragments await.",
    bg: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fa7b631dcaa83425a82eb6c9c5a03a92a?format=webp&width=1600",
    contentType: "text",
    hotspots: [
      { x: 82, y: 8, w: 10, h: 12, action: "collect", id: "frag-cover-1" },
    ],
  },
  {
    id: "welcome",
    title: "Welcome",
    body: "Embark on a transformative journey through The Mind Palace, where imagination fuels self-discovery and personal growth in an interactive quest.",
    bg: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Ffb68fa986e39431589f2a3fcffdf2178?format=webp&width=1600",
    contentType: "text",
    hotspots: [{ x: 10, y: 70, w: 12, h: 12, action: "link", id: "islands" }],
  },
  {
    id: "core-loop",
    title: "Core Activity Loop",
    body: "Unlock your imagination by exploring dreamscapes and solving engaging puzzles. Every fragment collected is growth.",
    bg: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F561ed111244e4e20828739bee50323b8?format=webp&width=1600",
    contentType: "text",
    hotspots: [
      { x: 68, y: 30, w: 18, h: 40, action: "game-rhythm", id: "rhythm-spot" },
    ],
  },
  {
    id: "islands",
    title: "Unlocking Dream Island Mysteries",
    body: "Discover hidden vision shards and unlock the secrets of each island through exploration and creativity.",
    bg: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fd2aa422e769a484a9df50992169c8de7?format=webp&width=1600",
    contentType: "gallery",
    hotspots: [
      { x: 18, y: 12, w: 16, h: 28, action: "collect", id: "frag-island-1" },
    ],
  },
  {
    id: "gallery",
    title: "Passion Galleries: Interactive Exhibits",
    body: "Music, art, and science exhibits — interact to unlock rooms and earn vision shards.",
    bg: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fc4e7bcb3c490419da0e26370418c5825?format=webp&width=1600",
    contentType: "video",
    videoUrls: [
      "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F0cd9c53a68b04d1aa7244ca03aca7ad3?alt=media&token=79879370-e6bd-4ec9-b89e-6ee6e568fef6&apiKey=dc3782de61224ee6afee73d63ac0f50c",
    ],
  },
  {
    id: "library",
    title: "Memory Library Adventures",
    body: "Solve word puzzles and reflection choices — keys open secret chambers.",
    bg: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fb964bc979b7949f6b16bbc771d0dda43?format=webp&width=1600",
    contentType: "game",
    game: "unscramble",
    hotspots: [
      { x: 75, y: 68, w: 12, h: 12, action: "collect", id: "frag-library-1" },
    ],
  },
  {
    id: "fragments",
    title: "Dream Fragments Collection",
    body: "Hidden across all islands — collect to unlock your Dream Constellation.",
    bg: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F1a2c40928b384af0ba2fa3890bdf09d0?format=webp&width=1600",
    contentType: "text",
    hotspots: [
      { x: 12, y: 40, w: 10, h: 10, action: "collect", id: "frag-frag-1" },
    ],
  },
  {
    id: "goal",
    title: "Experience Goal",
    body: "The quest for self-discovery drives personal growth. Collect fragments, explore, and shape your story-world.",
    bg: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F97c517096c034c4ba3d2bd0247ac9dc9?format=webp&width=1600",
    contentType: "text",
  },
  {
    id: "join",
    title: "Join the quest today!",
    body: "Start exploring and collect your first Dream Fragment.",
    bg: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F482db77f14cc47ac885e88b8a67d73f5?format=webp&width=1600",
    contentType: "text",
    hotspots: [
      { x: 84, y: 60, w: 12, h: 12, action: "collect", id: "frag-join-1" },
    ],
  },
];
