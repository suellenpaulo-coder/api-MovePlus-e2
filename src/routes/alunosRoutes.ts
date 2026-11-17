
import { Router } from "express";
import AlunosController from "../controllers/alunosControllers.js";

const router = Router();

// GET - LISTAR TODOS OS ALUNOS E APLICAR FILTROS
router.get("/", AlunosController.listar);

// GET - BUSCAR ALUNO PELO ID
router.get("/:id", AlunosController.buscar);

// POST - CADASTRAR ALUNO
router.post("/", AlunosController.cadastrar);

// PUT - ATUALIZAR ALUNO COMPLETAMENTE
router.put("/:id", AlunosController.atualizar);

// PATCH - ATUALIZAR ALUNO PARCIALMENTE
router.patch("/:id", AlunosController.atualizarParcialmente);

// DELETE - DELETAR ALUNO
router.delete("/:id", AlunosController.deletar);

export default router;
