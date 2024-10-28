import Usuario from "../models/usuarioModel.js"
import createUserToken from "../helpers/create-user-token.js"

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

// export const create = async (request, response) => {
//     const {nome, email, nickname, senha, imagem} = request.body

//     try{
//         await Usuario.create({ nome, email, nickname, senha, imagem })
//         response.status(201).json("CRIADO")
//     }catch (error){
//         response.status(500).json({ err: error })
//     }
// }