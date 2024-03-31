import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'


export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'ie/script.js', dest: 'ie' },
        { src: 'ie/styles.css', dest: 'ie' },
      ]
    })
  ]
});
