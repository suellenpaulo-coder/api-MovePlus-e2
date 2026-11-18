
import { Router } from "express";
import ExerciciosController from "../controllers/exerciciosControllers.js";
import validarSchema from "../middlewares/validarSchema.js";
import {
    exercicioSchema,
    exercicioAtualizacaoSchema
} from "../validators/exerciciosValidator.js";

const router = Router();

// ROTAS DOS EXERCÍCIOS

router.get("/", ExerciciosController.listar);

router.get("/aluno/:alunoId", ExerciciosController.listarPorAluno);

router.get("/:id", ExerciciosController.buscar);

router.post(
    "/",
    validarSchema(exercicioSchema),
    ExerciciosController.cadastrar
);

router.put(
    "/:id",
    validarSchema(exercicioSchema),
    ExerciciosController.atualizar
);

router.patch(
    "/:id",
    validarSchema(exercicioAtualizacaoSchema),
    ExerciciosController.atualizarParcialmente
);

router.delete("/:id", ExerciciosController.deletar);

export default router;
