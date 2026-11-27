
import { Router } from "express";
import AlunosController from "../controllers/alunosControllers.js";
import validarSchema from "../middlewares/validarSchema.js";
import { criarAlunoRepository } from "../repositories/RepositoryFactory.js";
import {
    alunoSchema,
    alunoAtualizacaoSchema
} from "../validators/alunosValidator.js";

const router = Router();

const alunosController = new AlunosController(criarAlunoRepository());

// ROTAS DOS ALUNOS

router.get("/", alunosController.listar);

router.get("/:id", alunosController.buscar);

router.post(
    "/",
    validarSchema(alunoSchema),
    alunosController.cadastrar
);

router.put(
    "/:id",
    validarSchema(alunoSchema),
    alunosController.atualizar
);

router.patch(
    "/:id",
    validarSchema(alunoAtualizacaoSchema),
    alunosController.atualizarParcialmente
);

router.delete("/:id", alunosController.deletar);

export default router;
