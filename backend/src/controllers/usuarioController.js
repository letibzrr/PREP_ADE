import Usuario from "../models/usuarioModel.js"

// export const create = async (request, response) => {
//     const {nome, email, nickname, senha, imagem} = request.body

//     try{
//         await Usuario.create({ nome, email, nickname, senha, imagem })
//         response.status(201).json("CRIADO")
//     }catch (error){
//         response.status(500).json({ err: error })
//     }
// }