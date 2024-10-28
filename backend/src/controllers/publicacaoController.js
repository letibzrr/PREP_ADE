import Publicacao from "../models/publicacaoModel.js"
import Comentario from "../models/comentarioModel.js"
import { literal } from "sequelize"
import { request, response } from "express"

export const getAllPublicacao = async (request, response) => {
    const publicacoes = await Publicacao.findAll({
        raw: true,
        attributes: [
            'id', 'titulo', 'local', 'cidade', 'imagem',
            [literal(`(
                SELECT COUNT(*) FROM curtidas
                WHERE curtidas.publicacao_id = publicacoes.id AND curtidas.tipo_avaliacao = 'up'
            )`), "total likes"], 
            [literal(`(
                SELECT COUNT(*) FROM curtidas
                WHERE curtidas.publicacao_id = publicacoes.id AND curtidas.tipo_avaliacao = 'down'
            )`), "total deslikes"],
            [literal(`(
                SELECT COUNT(*) FROM comentarios
                WHERE comentarios.publicacao_id = publicacoes.id 
            )`), "total comentários"]
        ]
    })
    response.status(200).json(publicacoes)
    // console.log(publicacoes)
}

export const getOnePublicacao = async (request, response) => {
    const {id} = request.params

    const publicacao = await Publicacao.findOne({
        raw: true, 
        where: {id},
        attributes: [
            'id', 'titulo', 'local', 'cidade', 'imagem',
            [literal(`(
                SELECT COUNT(*) FROM curtidas
                WHERE curtidas.publicacao_id = publicacoes.id AND curtidas.tipo_avaliacao = 'up'
            )`), "total likes"], 
            [literal(`(
                SELECT COUNT(*) FROM curtidas
                WHERE curtidas.publicacao_id = publicacoes.id AND curtidas.tipo_avaliacao = 'down'
            )`), "total deslikes"],
            [literal(`(
                SELECT COUNT(*) FROM comentarios
                WHERE comentarios.publicacao_id = publicacoes.id 
            )`), "total comentários"]
        ]
    })

    const comentariosPublicacao = await Comentario.findAll({
        raw: true, 
        where: {publicacao_id: publicacao.id},
    })
    publicacao.comentarios = comentariosPublicacao
    response.status(200).json(publicacao)
    console.log(publicacao.id)
}




// export const create = async (request, response) => {
//     const {titulo, local, cidade, imagem, id_empresa} = request.body

//     try{
//         await Publicacao.create({ titulo, local, cidade, imagem, id_empresa })
//         response.status(201).json("CRIADO")
//     }catch (error){
//         response.status(500).json({ err: error })
//     }
// }