/**
 * Site content config — swap featured lists later without redesign.
 * Voice: free public projects under a brand name — not “founder / company operator.”
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
  github: "https://github.com/scalinghuman/experiments",
  githubLabel: "github.com/scalinghuman/experiments",
  linkedin: "https://www.linkedin.com/in/srikanthab",
  x: "https://x.com/c0smicdirt",
  xLabel: "@c0smicdirt",
} as const;

export type Experiment = {
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
    title: "Kids Meal Mode",
    kicker: "Fire TV · Android TV · Sideload",
    description:
      "Timed bite prompts and parent PIN gates so children keep eating during screen time. Built for Fire TV and other Android TV streaming devices; private sideload (not on App Store).",
    href: "/apps/streaming-devices-kids-meal-mode",
    cta: "Details",
    icon: "/assets/apps/kids-meal-mode.png",
    iconAlt: "Kids Meal Mode app icon",
  },
];

/** Lookup by page path segment for app detail pages */
export const appsBySlug = {
  foodscanner: experiments[0],
  glasshole: experiments[1],
  "streaming-devices-kids-meal-mode": experiments[2],
} as const;

/** Official Apple badge (marketing guidelines asset). */
export const appStoreBadge = {
  src: "/assets/badges/app-store-black.svg",
  alt: "Download on the App Store",
  width: 120,
  height: 40,
} as const;

/** Future: public products list — keep empty until work authorization / intentional launch. */
export const products: Experiment[] = [];
