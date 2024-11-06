import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
vite: {
    plugins: [tailwindcss()],
  },
    // add yur domain name here
   site: 'https://callsupport.ai',
  integrations: [sitemap(),mdx()]
});