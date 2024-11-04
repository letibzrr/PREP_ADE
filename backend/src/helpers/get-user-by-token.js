import jwt from "jsonwebtoken"
import Usuario from "../models/usuarioModel.js"

const getUserByToken = (token) => {
    return new Promise(async (resolve, reject) => {
        if(!token){
            return response.status(401).json({err: "Acesso Negado"})
        }
        const decoded = jwt.verify(token, 'SENHASUPERSEGURA')
        // decoded => id, nome, email, nickname
        const usuarioId = decoded.id 
        
        try{
            const usuario = await Usuario.findOne({
                raw: true,
                where: {
                    id: usuarioId
                },
                attributes: [
                    'id', 'nome','imagem'
                ]
            })
            if(!usuario){
                reject({status: 404, message: "Usuário não encontrado"})
            }
            resolve(usuario)
        } catch(error) {
            reject({status: 500, message: "Erro ao buscar usuário"})
        }
    })
}

export default getUserByToken;