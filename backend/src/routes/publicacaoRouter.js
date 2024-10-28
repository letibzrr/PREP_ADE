import { Router } from "express"
import { getAllPublicacao, getOnePublicacao } from "../controllers/publicacaoController.js"

const router = Router();
router.get("/", getAllPublicacao)
router.get("/:id", getOnePublicacao) //proteger essa rota
// router.post('/', create);

export default router;