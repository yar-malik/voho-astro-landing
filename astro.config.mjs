import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
vite: {
  resolve: {
    alias: {
      '@': '/src', // Add alias for cleaner imports
    },
    ssr: {
      noExternal: ["@splidejs/splide", "@splidejs/splide-extension-auto-scroll"],
    },
  },
    plugins: [tailwindcss()],
  },
    // add yur domain name here
   site: 'https://callsupport.ai',
  integrations: [sitemap(),mdx(), react()]
});