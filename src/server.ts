
import "dotenv/config";
import app from "./app.js";
import { conectarMongo, conectarPostgres, getDbType } from "./config/dbConnect.js";

const porta = Number(process.env.PORT) || 3000;

async function iniciarServidor() {
    try {
        const dbType = getDbType();

        if (dbType === "MONGO") {
            await conectarMongo();
            console.log("MongoDB conectado com sucesso!");
        } else {
            await conectarPostgres();
            console.log("PostgreSQL conectado com sucesso!");
        }

        app.listen(porta, () => {
            console.log(`Servidor em execução na porta ${porta}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
        process.exit(1);
    }
}

iniciarServidor();
