
import express from "express";

// IMPORTANDO AS ROTAS
import academiaRoutes from "./routes/academiaRoutes.js";
import alunosRoutes from "./routes/alunosRoutes.js";
import exerciciosRoutes from "./routes/exerciciosRoutes.js";

const app = express();

// MIDDLEWARE PARA RECEBER JSON
app.use(express.json());

// ROTA INICIAL
app.get("/", (req, res) => {
    return res.status(200).send("MovePlus funcionando!");
});

// REGISTRANDO AS ROTAS
app.use("/academias", academiaRoutes);
app.use("/alunos", alunosRoutes);
app.use("/exercicios", exerciciosRoutes);

export default app;
