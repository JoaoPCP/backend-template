import { Request, Response } from "express"
import { app } from "./server"
import express from "express"
import dotenv from "dotenv"
import path from "path"
import router from "./routing/index"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") })
app.use(express.json())
app.use(cookieParser())
app.use(cors()) //insert application domains here
app.use(router)
app.use("/", (req: Request, res: Response) => {
	res.send("Hello World!")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`)
})
