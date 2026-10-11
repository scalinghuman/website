/**
 * Site content config — swap featured lists later without redesign.
 * Voice: personal, noncommercial experiments under a shared name.
 * When products go public (after proper work authorization), populate `products`.
 */

/** Signature tagline — tech-native form is intentional. */
export const tagline = "Humans + Machines >> Humans | Machines" as const;

/** Plain-language reading for assistive tech (operators can be noisy). */
export const taglineAccessible =
  "Humans plus machines is better than humans or machines alone" as const;

export const person = {
  name: "Srikantha Ballani",
  email: "srikantha.ballani@gmail.com",
  github: "https://github.com/c0smicdirt",
  githubLabel: "github.com/c0smicdirt",
  linkedin: "https://www.linkedin.com/in/srikanthab",
  x: "https://x.com/c0smicdirt",
  xLabel: "@c0smicdirt",
} as const;

export const collection = {
  github: "https://github.com/scalinghuman/experiments",
  notes: "https://github.com/scalinghuman/experiments/tree/main/docs/projects",
  organization: "https://github.com/scalinghuman",
  repositories: "https://github.com/orgs/scalinghuman/repositories",
  websiteSource: "https://github.com/scalinghuman/website",
} as const;

export type Experiment = {
  /** Stable page identifier, independent of card order. */
  slug: string;
  availability: "available" | "development";
  briefUrl: string;
  title: string;
  kicker: string;
  description: string;
  href: string;
  cta?: string;
  /** Public App Store listing, when available */
  appStoreUrl?: string;
  appStoreLabel?: string;
  /** App icon path under /public */
  icon?: string;
  iconAlt?: string;
};

/** Featured free experiments only (not RT Library, not future products). */
export const experiments: Experiment[] = [
  {
    slug: "foodscanner",
    availability: "available",
    briefUrl: `${collection.github}/blob/main/docs/projects/foodscanner.md`,
    title: "Food Scanner",
    kicker: "iPhone · App Store",
    description:
      "Turn a food photo into an AI-assisted nutrition overlay — calories, macros, and concise pros and cons. Standalone on iPhone, optional wearable companion.",
    href: "/apps/foodscanner",
    cta: "Details",
    appStoreUrl: "https://apps.apple.com/us/app/food-scanner-ai-overlay/id6790629113",
    appStoreLabel: "App Store",
    icon: "/assets/apps/foodscanner.png",
    iconAlt: "Food Scanner app icon",
  },
  {
    slug: "glasshole",
    availability: "available",
    briefUrl: `${collection.github}/blob/main/docs/projects/glasshole.md`,
    title: "Glasshole AI",
    kicker: "iPhone · App Store",
    description:
      "Live AI fact-check and overlay for spoken conversation. Records only when you start a session — use only with consent and local law compliance.",
    href: "/apps/glasshole",
    cta: "Details",
    appStoreUrl:
      "https://apps.apple.com/us/app/glasshole-ai-for-google-glass/id6784266697",
    appStoreLabel: "App Store",
    icon: "/assets/apps/glasshole.png",
    iconAlt: "Glasshole AI app icon",
  },
  {
    slug: "streaming-devices-kids-meal-mode",
    availability: "available",
    briefUrl: `${collection.github}/blob/main/docs/projects/kids-meal-mode.md`,
    title: "Kids Meal Mode",
    kicker: "Fire TV · Android TV · Sideload",
    description:
      "Timed bite prompts and parent PIN gates for family screen time. Built for Fire TV and other Android TV devices; a free APK is available to sideload, with source maintained privately.",
    href: "/apps/streaming-devices-kids-meal-mode",
    cta: "Details",
    icon: "/assets/apps/kids-meal-mode.png",
    iconAlt: "Kids Meal Mode app icon",
  },
  {
    slug: "qwen38-27b-eval",
    availability: "available",
    briefUrl: `${collection.github}/blob/main/docs/projects/local-ai-game.md`,
    title: "Build Super Mario Web Edition for $0",
    kicker: "Local AI · Offline · Browser game",
    description:
      "A one-shot local-model experiment: build a complete Super Mario-style web game with no cloud inference, external assets, or follow-up prompts.",
    href: "/apps/qwen38-27b-eval",
    cta: "Play the experiment",
    icon: "/assets/apps/qwen-local-mario-demo.png",
    iconAlt: "Super Mario-style browser game created during a local AI evaluation",
  },

  {
    slug: "book-cricket",
    availability: "development",
    briefUrl: `${collection.github}/blob/main/docs/projects/book-cricket.md`,
    title: "Book Cricket",
    kicker: "iPhone Duo · iPhone · Coming soon",
    description:
      "The classroom was the stadium. A nostalgic page-flip cricket game with solo, same-phone and nearby matches, plus 1,000 Cricket Facts by S Ballani. Free at launch.",
    href: "/apps/book-cricket",
    cta: "Screenshots & walkthrough",
    icon: "/assets/apps/book-cricket/icon.png",
    iconAlt: "Book Cricket: cricket ball, stumps and a book",
  },
  {
    slug: "ring-local",
    availability: "development",
    briefUrl: `${collection.github}/blob/main/docs/projects/ring-local.md`,
    title: "Smart Ring Local",
    kicker: "iPhone · Personal use · In development",
    description: "A personal companion experiment for Oura Ring 4: direct Bluetooth to iPhone, local storage and no required cloud relay. Hardware validation pending.",
    href: "/apps/ring-local",
    cta: "Project scope & status",
  },
  {
    slug: "strap-local",
    availability: "development",
    briefUrl: `${collection.github}/blob/main/docs/projects/strap-local.md`,
    title: "Smart Strap Local",
    kicker: "iPhone · Personal use · In development",
    description: "A personal companion experiment for WHOOP 5.0: direct Bluetooth to iPhone, local storage and no required cloud relay. Hardware validation pending.",
    href: "/apps/strap-local",
    cta: "Project scope & status",
  },
];

/** Lookup by page path segment for app detail pages */
export const appsBySlug: Record<string, Experiment> = Object.fromEntries(
  experiments.map((project) => [project.slug, project]),
);

/** Official Apple badge (marketing guidelines asset). */
export const appStoreBadge = {
  src: "/assets/badges/app-store-black.svg",
  alt: "Download on the App Store",
  width: 120,
  height: 40,
} as const;

export const companionApps = {
  foodscanner: {
    apkUrl:
      "https://github.com/scalinghuman/experiments/releases/download/glass-companions-v1.0.0/foodscanner-glass-companion-v1.0.0.apk",
    guideUrl:
      "https://github.com/scalinghuman/experiments/blob/main/docs/glass/GLASS_INSTALL_GUIDE.md",
  },
  glasshole: {
    apkUrl:
      "https://github.com/scalinghuman/experiments/releases/download/glass-companions-v1.0.0/glasshole-glass-companion-v1.0.0.apk",
    guideUrl:
      "https://github.com/scalinghuman/experiments/blob/main/docs/glass/GLASS_INSTALL_GUIDE.md",
  },
} as const;

/** Future: public products list — keep empty until work authorization / intentional launch. */
export const products: Experiment[] = [];
