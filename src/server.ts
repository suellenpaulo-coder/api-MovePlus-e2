
import "dotenv/config";
import app from "./app.js";
import conectarBanco from "./config/database.js";

const porta = process.env.PORT || 3000;

const iniciarServidor = async () => {
  await conectarBanco();

  app.listen(porta, () => {
    console.log(`Servidor em execução na porta ${porta}`);
  });
};

iniciarServidor();
