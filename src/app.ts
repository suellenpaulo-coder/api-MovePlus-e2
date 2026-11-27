
import express from "express";
import swaggerUi from "swagger-ui-express";

// IMPORTANDO AS ROTAS
import academiaRoutes from "./routes/academiaRoutes.js";
import alunosRoutes from "./routes/alunosRoutes.js";
import exerciciosRoutes from "./routes/exerciciosRoutes.js";

// IMPORTANDO A DOCUMENTAÇÃO
import { swaggerDocument } from "./docs/swagger.js";

const app = express();

// MIDDLEWARE PARA RECEBER JSON
app.use(express.json());

// ROTA INICIAL
app.get("/", (req, res) => {
    return res.status(200).send("MovePlus funcionando!");
});

// ROTA DA DOCUMENTAÇÃO INTERATIVA (SWAGGER)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// REGISTRANDO AS ROTAS
app.use("/academias", academiaRoutes);
app.use("/alunos", alunosRoutes);
app.use("/exercicios", exerciciosRoutes);

export default app;
