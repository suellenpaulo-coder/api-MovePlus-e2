
import { Router } from "express";
import ExerciciosController from "../controllers/exerciciosControllers.js";

const router = Router();

// ROTAS DOS EXERCÍCIOS

// GET - LISTAR TODOS OS EXERCÍCIOS COM FILTROS DINÂMICOS
router.get("/", ExerciciosController.listar);

// GET - LISTAR EXERCÍCIOS DE UM ALUNO
router.get("/aluno/:alunoId", ExerciciosController.listarPorAluno);

// GET - BUSCAR UM EXERCÍCIO PELO ID
router.get("/:id", ExerciciosController.buscar);

// POST - REGISTRAR EXERCÍCIO
router.post("/", ExerciciosController.cadastrar);

// PUT - ATUALIZAR EXERCÍCIO COMPLETAMENTE
router.put("/:id", ExerciciosController.atualizar);

// PATCH - ATUALIZAR EXERCÍCIO PARCIALMENTE
router.patch("/:id", ExerciciosController.atualizarParcialmente);

// DELETE - DELETAR EXERCÍCIO
router.delete("/:id", ExerciciosController.deletar);

export default router;
