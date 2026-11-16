
import "dotenv/config";
import app from "./app.js";
import conectarBanco from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await conectarBanco();

    app.listen(PORT, () => {
      console.log(`Servidor em execução na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
}

startServer();
