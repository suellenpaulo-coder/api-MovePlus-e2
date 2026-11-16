
import mongoose from "mongoose";

async function conectaNaDatabase(): Promise<typeof mongoose.connection> {
    const dbURI = process.env.MONGODB_URI;

    if (!dbURI) {
        throw new Error("Variável MONGODB_URI não encontrada no arquivo .env");
    }

    try {
        await mongoose.connect(dbURI);
        console.log("Banco de dados conectado com sucesso!");

        return mongoose.connection;
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        throw error;
    }
}

export default conectaNaDatabase;
