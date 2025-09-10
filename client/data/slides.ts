export type Slide = {
  id: string;
  title?: string;
  subtitle?: string;
  body?: string;
  bg?: string;
  images?: string[];
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
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fa7b631dcaa83425a82eb6c9c5a03a92a?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Ffc265a13f8d141d69d1e34fa87b795e7?format=webp&width=1600",
    ],
    contentType: "text",
    hotspots: [
      { x: 82, y: 8, w: 10, h: 12, action: "collect", id: "frag-cover-1" },
    ],
  },
  {
    id: "welcome",
    title: "Welcome",
    body: "Embark on a transformative journey through The Mind Palace, where imagination fuels self-discovery and personal growth in an interactive quest.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F561ed111244e4e20828739bee50323b8?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F85be4d75a49549508580b5c10fa9c116?format=webp&width=1600",
    ],
    contentType: "text",
    hotspots: [{ x: 10, y: 70, w: 12, h: 12, action: "link", id: "islands" }],
  },
  {
    id: "core-loop",
    title: "Core Activity Loop",
    body: "Unlock your imagination by exploring dreamscapes and solving engaging puzzles. Every fragment collected is growth.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F00846faa8cd2499b8e8df93214d7e7e7?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Ffb68fa986e39431589f2a3fcffdf2178?format=webp&width=1600",
    ],
    contentType: "text",
    hotspots: [
      { x: 68, y: 30, w: 18, h: 40, action: "game-rhythm", id: "rhythm-spot" },
    ],
  },
  {
    id: "islands",
    title: "Unlocking Dream Island Mysteries",
    body: "Discover hidden vision shards and unlock the secrets of each island through exploration and creativity.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fd2aa422e769a484a9df50992169c8de7?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F256142451f3a45b8a9cfcb7d4693f47f?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F7a210362ffe84ba0ba87d9b9d282e9e1?format=webp&width=1600",
    ],
    contentType: "gallery",
    hotspots: [
      { x: 18, y: 12, w: 16, h: 28, action: "collect", id: "frag-island-1" },
    ],
  },
  {
    id: "gallery",
    title: "Passion Galleries: Interactive Exhibits",
    body: "Music, art, and science exhibits — interact to unlock rooms and earn vision shards.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fa2b326f7b5594586869b7f7c511a6b67?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fb0b11ff5dfcb488bb429490413a265d0?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fc4e7bcb3c490419da0e26370418c5825?format=webp&width=1600",
    ],
    contentType: "video",
    videoUrls: [
      "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F0cd9c53a68b04d1aa7244ca03aca7ad3?alt=media&token=79879370-e6bd-4ec9-b89e-6ee6e568fef6&apiKey=dc3782de61224ee6afee73d63ac0f50c",
    ],
  },
  {
    id: "library",
    title: "Memory Library Adventures",
    body: "Solve word puzzles and reflection choices — keys open secret chambers.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fb964bc979b7949f6b16bbc771d0dda43?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fc4e7bcb3c490419da0e26370418c5825?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F1a2c40928b384af0ba2fa3890bdf09d0?format=webp&width=1600",
    ],
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
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F482db77f14cc47ac885e88b8a67d73f5?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F97c517096c034c4ba3d2bd0247ac9dc9?format=webp&width=1600",
    ],
    contentType: "text",
    hotspots: [
      { x: 12, y: 40, w: 10, h: 10, action: "collect", id: "frag-frag-1" },
    ],
  },
  {
    id: "goal",
    title: "Experience Goal",
    body: "The quest for self-discovery drives personal growth. Collect fragments, explore, and shape your story-world.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F6c64a7bebc8a44c4803722bf6fcfcf77?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fd2aa422e769a484a9df50992169c8de7?format=webp&width=1600",
    ],
    contentType: "text",
  },
  {
    id: "join",
    title: "Join the quest today!",
    body: "Start exploring and collect your first Dream Fragment.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F6e9aec51861549a89390ad7909a680d3?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F256142451f3a45b8a9cfcb7d4693f47f?format=webp&width=1600",
    ],
    contentType: "text",
    hotspots: [
      { x: 84, y: 60, w: 12, h: 12, action: "collect", id: "frag-join-1" },
    ],
  },
  {
    id: "mindpalace-intro",
    title: "The Mind Palace – Dreams & Memories 🌌",
    subtitle: "Step inside your imagination",
    body: "An AI-powered immersive app that lets you explore your inner universe. Walk through dreamlike palaces, unlock memories, and build personalized dreamscapes.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fdaee8ec266f34bf8a744c3668a09eb72?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fdd600b8ec3644367950f62147cea59af?format=webp&width=1600",
    ],
    contentType: "text",
    hotspots: [{ x: 78, y: 18, w: 10, h: 12, action: "link", id: "gallery" }],
  },
  {
    id: "problem",
    title: "The Problem",
    body: "Traditional tools (journals, therapy, apps) often fail to capture the depth of dreams, memories, and inner thought. People want an emotional, immersive way to explore their mind.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F85be4d75a49549508580b5c10fa9c116?format=webp&width=1600",
    ],
    contentType: "text",
  },
  {
    id: "solution",
    title: "Solution: The Mind Palace",
    body: "An AI-powered interactive palace where users walk through dreamscapes, unlock hidden memories, and build emotional resilience. A fusion of neuroscience, creativity, and AI storytelling.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fdaee8ec266f34bf8a744c3668a09eb72?format=webp&width=1600",
    ],
    contentType: "text",
    hotspots: [{ x: 20, y: 70, w: 12, h: 12, action: "link", id: "library" }],
  },
  {
    id: "product-demo",
    title: "Product Demo",
    body: "Imagine entering a dreamlike palace, choosing a door to a world that represents a memory, interacting with glowing objects that unlock emotions, and saving personalized dreamscapes.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fdaee8ec266f34bf8a744c3668a09eb72?format=webp&width=1600",
    ],
    contentType: "video",
    videoUrls: [
      "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fd927b7457b774f65b1a8e16d2b400a22?alt=media&token=ed62e231-5ee8-4beb-a070-314e945aab7c&apiKey=dc3782de61224ee6afee73d63ac0f50c",
      "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fc1dd8dd7f73345f7bf683e0e40cb3437?alt=media&token=3c965fe7-b1d8-47e0-bdeb-68f4a7049cef&apiKey=dc3782de61224ee6afee73d63ac0f50c",
      "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F7b087ce4b5314e3a876ca8be09f481cd?alt=media&token=03a6eff8-6379-4c4a-a8b9-ce9b57ae11a3&apiKey=dc3782de61224ee6afee73d63ac0f50c",
      "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F2af3b82a3981486887baed942ed0b382?alt=media&token=40a6593d-d2a1-4a2c-aaea-a09feacda550&apiKey=dc3782de61224ee6afee73d63ac0f50c",
    ],
  },
  {
    id: "audience",
    title: "Target Audience",
    body: "Students: strengthen memory & creativity. Creatives: unlock inspiration. Mental health advocates: emotional healing. Lifelong learners: self-discovery.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Ffc265a13f8d141d69d1e34fa87b795e7?format=webp&width=1600",
    ],
    contentType: "text",
  },
  {
    id: "market",
    title: "Market Opportunity",
    body: "$5B+ Global Wellness & $12B+ EdTech — growing demand for immersive storytelling & mental health tools.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F561ed111244e4e20828739bee50323b8?format=webp&width=1600",
    ],
    contentType: "text",
  },
  {
    id: "technology",
    title: "Technology",
    body: "AI storytelling engines, cloud-based platform, VR/AR-ready 3D dreamscapes, and adaptive audio. Integrations with text-to-scene and image models for dynamic environments.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F6e9aec51861549a89390ad7909a680d3?format=webp&width=1600",
    ],
    contentType: "text",
  },
  {
    id: "uvp",
    title: "Unique Value Proposition",
    body: "Interactive and immersive (not passive like meditation apps), focused on self-discovery (not just escape like games), and personalized (not a one-size-fits-all therapy tool).",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fdaee8ec266f34bf8a744c3668a09eb72?format=webp&width=1600",
    ],
    contentType: "text",
  },
  {
    id: "roadmap",
    title: "Roadmap & Future Vision",
    body: "Current: interactive web prototype + AI dreamscapes. Next: VR expansion, neural storytelling. Future: memory-sharing network & collaborative dream worlds.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F256142451f3a45b8a9cfcb7d4693f47f?format=webp&width=1600",
    ],
    contentType: "text",
  },
  {
    id: "join-quest",
    title: "Join the quest today!",
    body: "Start exploring and collect your first Dream Fragment. Your mind is not a place to escape — it's a universe to explore.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fdd600b8ec3644367950f62147cea59af?format=webp&width=1600",
    ],
    contentType: "text",
    hotspots: [
      { x: 84, y: 60, w: 12, h: 12, action: "collect", id: "frag-join-2" },
    ],
  },
];
