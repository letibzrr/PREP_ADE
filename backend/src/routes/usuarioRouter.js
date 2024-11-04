import { Router } from "express"
import { login, logout, userInfo } from "../controllers/usuarioController.js"
import verifyToken from "../middleware/verify-token.js"

const router = Router()
router.post("/login", login)
router.post("/logout", verifyToken, logout)
router.get("/info", verifyToken, userInfo)

export default router;