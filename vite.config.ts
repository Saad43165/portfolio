import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Automatically copy project images from root to public/ on dev/build startup
const filesToCopy = ['signbridge.jpeg', 'agri.png', 'naheed.png', 'vax.png', 'run.png', 'Saad_Ikram_CV.pdf'];
const publicDir = path.resolve(__dirname, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

filesToCopy.forEach(file => {
  const src = path.resolve(__dirname, file);
  const dest = path.resolve(publicDir, file);
  if (fs.existsSync(src)) {
    try {
      fs.copyFileSync(src, dest);
      console.log(`Successfully copied ${file} to public/`);
    } catch (err) {
      console.error(`Failed to copy ${file}:`, err);
    }
  } else {
    console.warn(`Source file not found: ${src}`);
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

