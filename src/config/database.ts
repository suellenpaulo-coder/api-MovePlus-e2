
import mongoose from "mongoose";

const conectarBanco = async (): Promise<void> => {
  const uri =
    process.env.MONGODB_URI ||
    process.env.DATABASE_URI;

  if (!uri) {
    throw new Error(
      "Variável de conexão do MongoDB não encontrada no .env."
    );
  }

  try {
    await mongoose.connect(uri);

    console.log("MongoDB conectado com sucesso!");
    console.log(
      "Banco conectado:",
      mongoose.connection.name
    );
  } catch (error) {
    console.error(
      "Erro ao conectar ao MongoDB:",
      error
    );

    throw error;
  }
};

export default conectarBanco;
