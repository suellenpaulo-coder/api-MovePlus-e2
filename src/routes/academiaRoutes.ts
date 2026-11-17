import { Router } from "express";
import AcademiaController from "../controllers/academiaControllers.ts";

const router = Router();

// ROTAS DA ACADEMIA
router.get("/", AcademiaController.buscar);
router.put("/", AcademiaController.atualizar);

export default router;