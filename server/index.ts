import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Ajustar o caminho para os arquivos estáticos
  const staticPath = process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "../dist")
    : path.resolve(__dirname, "..", "dist");

  app.use(express.static(staticPath));

  // Verificar se o arquivo index.html existe no caminho correto
  app.get("*", (_req, res) => {
    const indexPath = path.join(staticPath, "index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("Erro ao servir o arquivo index.html:", err);
        res.status(500).send("Erro ao carregar a página.");
      }
    });
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
