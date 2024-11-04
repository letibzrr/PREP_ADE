import jwt from "jsonwebtoken"
import getToken from "../helpers/get-token.js"

const verifyToken = (request, response, next) => {
    if(!request.headers.authorization){
        return response.status(401).json({message: "Acesso negado! Cabeçalho de autorização ausente"})
    }
    
    const token = getToken(request)
    if(!token){
        return response.status(401).json({message: "Acesso negado! Token não fornecido o inválido"})
    }

    try{
        const verified = jwt.verify(token, "SENHASUPERSEGURA")
        request.usuario = verified.id
        next()
    } catch (error) {
        console.log(error)
        response.status(500).json({message: "Token inválido"})
    }
}

export default verifyToken