import mongoose from "mongoose";
import prisma from "./prismaClient.js";

export type DbType = "MONGO" | "POSTGRES";

// LÊ E VALIDA QUAL BANCO DE DADOS A API DEVE UTILIZAR
export function getDbType(): DbType {
    const dbType = process.env.DB_TYPE;

    if (dbType !== "MONGO" && dbType !== "POSTGRES") {
        throw new Error(
            "DB_TYPE inválido ou não encontrado no arquivo .env. Utilize MONGO ou POSTGRES."
        );
    }

    return dbType;
}

// CONECTA NO MONGODB
export async function conectarMongo(): Promise<typeof mongoose.connection> {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
        throw new Error("MONGODB_URI não encontrada no arquivo .env");
    }

    await mongoose.connect(mongoURI);

    return mongoose.connection;
}

// CONECTA NO POSTGRESQL (VIA PRISMA)
export async function conectarPostgres() {
    const databaseURL = process.env.DATABASE_URL;

    if (!databaseURL) {
        throw new Error("DATABASE_URL não encontrada no arquivo .env");
    }

    // $connect() não valida a conexão de fato com o adapter do pg
    // (a pool só conecta no primeiro uso), então testamos com uma query simples
    await prisma.$queryRaw`SELECT 1`;

    return prisma;
}
