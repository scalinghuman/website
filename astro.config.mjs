// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://scalinghuman.ai',
  // Keep normal spaces around inline links and emphasis in multiline HTML.
  // Astro 7's JSX whitespace default joins those words together.
  compressHTML: true,
  // Emit privacy.html / support.html so App Store URLs stay stable
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
});
