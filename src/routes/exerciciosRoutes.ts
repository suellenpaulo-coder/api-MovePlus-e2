
import { Router } from "express";
import ExerciciosController from "../controllers/exerciciosControllers.js";
import validarSchema from "../middlewares/validarSchema.js";
import { criarExercicioRepository } from "../repositories/RepositoryFactory.js";
import {
    exercicioSchema,
    exercicioAtualizacaoSchema
} from "../validators/exerciciosValidator.js";

const router = Router();

const exerciciosController = new ExerciciosController(criarExercicioRepository());

// ROTAS DOS EXERCÍCIOS

router.get("/", exerciciosController.listar);

router.get("/aluno/:alunoId", exerciciosController.listarPorAluno);

router.get("/:id", exerciciosController.buscar);

router.post(
    "/",
    validarSchema(exercicioSchema),
    exerciciosController.cadastrar
);

router.put(
    "/:id",
    validarSchema(exercicioSchema),
    exerciciosController.atualizar
);

router.patch(
    "/:id",
    validarSchema(exercicioAtualizacaoSchema),
    exerciciosController.atualizarParcialmente
);

router.delete("/:id", exerciciosController.deletar);

export default router;
