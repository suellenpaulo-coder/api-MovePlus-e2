
import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";
import Aluno from "./models/alunos.js";

const porta = process.env.PORT || 3000;

// ALUNOS INICIAIS
const alunosIniciais = [
    { id: 1, name: "Lucas Santos" },
    { id: 2, name: "Mariana Oliveira" },
    { id: 3, name: "Pedro Henrique" },
    { id: 4, name: "Ana Clara" }
];

// CONEXÃO COM O BANCO DE DADOS
mongoose.connect(process.env.MONGODB_URI!)
    .then(async () => {
        console.log("MongoDB conectado com sucesso!");

        // CADASTRO DOS ALUNOS INICIAIS
        for (const aluno of alunosIniciais) {
            await Aluno.updateOne(
                { id: aluno.id },
                { $setOnInsert: aluno },
                { upsert: true }
            );
        }

        console.log("Alunos iniciais verificados!");

        // INICIALIZAÇÃO DO SERVIDOR
        app.listen(porta, () => {
            console.log(`Servidor em execução na porta ${porta}`);
        });
    })
    .catch((erro) => {
        console.error("Erro ao conectar ao MongoDB:", erro);
    });
