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
      
      noExternal: ["@splidejs/splide", "@splidejs/splide-extension-auto-scroll", "gabber-client-react", "gabber-client-core"],
    },
  },
    plugins: [tailwindcss()],
  },
    // add yur domain name here
   site: 'https://vohoai.com',
  integrations: [sitemap(),mdx(), react()]
});