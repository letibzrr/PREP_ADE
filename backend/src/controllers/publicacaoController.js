import Publicacao from "../models/publicacaoModel.js"

// export const create = async (request, response) => {
//     const {titulo, local, cidade, imagem, id_empresa} = request.body

//     try{
//         await Publicacao.create({ titulo, local, cidade, imagem, id_empresa })
//         response.status(201).json("CRIADO")
//     }catch (error){
//         response.status(500).json({ err: error })
//     }
// }