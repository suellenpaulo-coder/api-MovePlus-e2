// importar o metodo router do express
import { Router} from "express";

// importar o controller da academia
import AcademiaController from "../controllers/academiaControllers.js";

// inicializar o gerenciador de rotas
 const router = Router();

 // criaçaop de rotas para a academia
    router.get("/academias", AcademiaController.listar);
    router.get("/academias/:id", AcademiaController.buscar);
    router.post("/academias", AcademiaController.cadastrar);
    router.put("/academias/:id", AcademiaController.atualizar);
    router.delete("/academias/:id", AcademiaController.deletar);
    
// exportar o gerenciador de rotas
export default router;