import Usuario from "../models/usuarioModel.js"
import Curtida from "../models/curtidaModel.js"
import createUserToken from "../helpers/create-user-token.js"
import getToken from "../helpers/get-token.js"
import getUserByToken from "../helpers/get-user-by-token.js"
import conn from "../config/conn.js"

export const login = async (request, response) => {
    const {email, senha} = request.body

    try { 
        const usuario = await Usuario.findOne({ where: { email }})
        if(!email){
            response.status(404).json({message: "Usuário não encontrado"})
            return
        }
        if(usuario.senha !==senha){
            response.status(400).json({message: "Senha inválida"})
            return
        }

        createUserToken(usuario, request, response)
        

    } catch (error) {
        console.error(error)
        response.status(500).json({err: "Erro ao fazer login"})
    }
}

export const logout = (request, response) => {
    response.status(200).json({message: "Você saiu da aplicação"})
}

export const userInfo = async (request, response) => {
    try {
        const token = getToken(request)
        const usuario = await getUserByToken(token)
        const usuarioId = usuario.id

        const like = await Curtida.findAndCountAll({
            raw: true,
            where: {usuario_id: usuarioId, tipo_avaliacao: 'up'}
        })
        const deslike = await Curtida.findAndCountAll({
            raw: true,
            where: {usuario_id: usuarioId, tipo_avaliacao: 'down'}
        })

        const publicacoesCurtidas = await conn.query(
            `
            SELECT publicacoes.id, curtidas.tipo_avaliacao
            FROM curtidas
            INNER JOIN publicacoes
            ON curtidas.publicacao_id = publicacoes.id 
            WHERE curtidas.usuario_id = :usuarioId
            `,
            {
                replacements: {usuarioId},
                type: conn.QueryTypes.SELECT
            }
        )

        usuario.totalLike = like.count 
        usuario.totalDeslike = deslike.count 
        usuario.interacoes = publicacoesCurtidas

        response.status(200).json(usuario)
    } catch (error) {
        console.error(error)
        response.status(500).json({err: "Erro ao buscar informações de usuários"})
    }
}

// export const create = async (request, response) => {
//     const {nome, email, nickname, senha, imagem} = request.body

//     try{
//         await Usuario.create({ nome, email, nickname, senha, imagem })
//         response.status(201).json("CRIADO")
//     }catch (error){
//         response.status(500).json({ err: error })
//     }
// }