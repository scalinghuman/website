// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://scalinghuman.ai',
  // Emit privacy.html / support.html so App Store URLs stay stable
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
});
