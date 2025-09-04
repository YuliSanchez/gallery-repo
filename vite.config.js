import { defineConfig } from "vite";

export default defineConfig({
  root: "src", // aquí está tu index.html
  build: {
    outDir: "../dist", // salida final
    emptyOutDir: true, // limpia dist antes de compilar
    rollupOptions: {
      input: "src/index.html", // 👈 aseguramos el entry
    }
  },
  server: {
    port: 5173, // puerto para npm run dev
    open: true, // abre el navegador automáticamente
  },
});