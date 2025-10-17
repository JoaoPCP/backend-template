import express from "express"
import auth, { authMiddleware } from "./routers/auth"
import userRouter from "./routers/userRouter"

const router = express.Router()

router.use(auth)
router.use(authMiddleware)
router.use(userRouter)

export default router
