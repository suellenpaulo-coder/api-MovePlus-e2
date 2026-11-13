
import mongoose from "mongoose";

const conectarBanco = async (): Promise<void> => {
  try {
    const uri = process.env.DATABASE_URI;

    if (!uri) {
      throw new Error("DATABASE_URI não foi definida no arquivo .env");
    }

    await mongoose.connect(uri);

    console.log("MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
};

export default conectarBanco;
