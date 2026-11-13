
import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const porta = Number(process.env.PORT) || 3000;

async function iniciarServidor() {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error("MONGODB_URI não encontrada no arquivo .env");
        }

        await mongoose.connect(mongoURI);

        console.log("MongoDB conectado com sucesso!");

        app.listen(porta, () => {
            console.log(`Servidor em execução na porta ${porta}`);
        });

    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
        process.exit(1);
    }
}

iniciarServidor();
