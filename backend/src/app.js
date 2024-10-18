import express from "express"
import cors from "cors"

import conn from "./config/conn.js" //banco de dados

//tabelas
import Empresa from "./models/empresaModel.js"
import Usuario from "./models/usuarioModel.js"
import Publicacao from "./models/publicacaoModel.js"
import Curtida from "./models/curtidaModel.js"
import Comentario from "./models/comentarioModel.js"

//rotas
import empresaRouter from "./routes/empresaRouter.js"
import usuarioRouter from "./routes/usuarioRouter.js"
import publicacaoRouter from "./routes/publicacaoRouter.js"

const app = express()

app.use(cors()) //disponibiliza as rotas para o frontend
app.use(express.urlencoded({extended: true})) //permitir o uso de imagem
app.use(express.json()) //modo json

conn.sync(/*{force: true}*/).then().catch((error) => console.error(error))

//utilização das rotas
app.use("/api/empresas", empresaRouter)
app.use("/api/usuarios", usuarioRouter)
app.use("/api/publicacoes", publicacaoRouter)

app.use((request, response) => {
    response.status(404).json({err: "Rota não encontrada"})
}) 

export default app;