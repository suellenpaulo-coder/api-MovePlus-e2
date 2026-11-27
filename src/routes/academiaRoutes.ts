import { Router } from "express";
import AcademiaController from "../controllers/academiaControllers.js";
import validarSchema from "../middlewares/validarSchema.js";
import { criarAcademiaRepository } from "../repositories/RepositoryFactory.js";
import {
    academiaSchema,
    academiaAtualizacaoSchema
} from "../validators/academiaValidator.js";

const router = Router();

const academiaController = new AcademiaController(criarAcademiaRepository());

// ROTAS DA ACADEMIA

router.get("/", academiaController.listar);

router.get("/:id", academiaController.buscar);

router.post(
    "/",
    validarSchema(academiaSchema),
    academiaController.cadastrar
);

router.put(
    "/:id",
    validarSchema(academiaSchema),
    academiaController.atualizar
);

router.patch(
    "/:id",
    validarSchema(academiaAtualizacaoSchema),
    academiaController.atualizarParcialmente
);

router.delete("/:id", academiaController.deletar);

export default router;
