
import { Router } from "express";
import AlunosController from "../controllers/alunosControllers.js";
import validarSchema from "../middlewares/validarSchema.js";
import {
    alunoSchema,
    alunoAtualizacaoSchema
} from "../validators/alunosValidator.js";

const router = Router();

// ROTAS DOS ALUNOS

router.get("/", AlunosController.listar);

router.get("/:id", AlunosController.buscar);


router.post(
    "/",
    (req, res, next) => {
        console.log("ROTA POST /alunos FOI ACESSADA");
        console.log("BODY RECEBIDO:", req.body);
        next();
    },
    validarSchema(alunoSchema),
    AlunosController.cadastrar
);


router.put(
    "/:id",
    (req, res, next) => {
        console.log("ROTA PUT /alunos FOI ACESSADA");
        console.log("BODY RECEBIDO:", req.body);
        next();
    },
    validarSchema(alunoSchema),
    AlunosController.atualizar
);

router.patch(
    "/:id",
    (req, res, next) => {
        console.log("ROTA PATCH /alunos FOI ACESSADA");
        console.log("BODY RECEBIDO:", req.body);
        next();
    },
    validarSchema(alunoAtualizacaoSchema),
    AlunosController.atualizarParcialmente
);

router.delete("/:id", AlunosController.deletar);

export default router;
