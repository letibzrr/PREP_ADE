import Empresa from "../models/empresaModel.js"
import Curtida from "../models/curtidaModel.js"

export const getEmpresa = async (request, response) => {
    try {
        const infoEmpresa = await Empresa.findByPk(1, {raw: true})
        // console.log(infoEmpresa)

        const like = await Curtida.count({
             where:{tipo_avaliacao: 'up'}
        }) // console.log('like =>', like)

        const deslike = await Curtida.count({
            where:{tipo_avaliacao: 'down'}
       })  //    console.log('deslike =>', deslike)

       const empresa = {
        id: infoEmpresa.id,
        nome: infoEmpresa.nome,
        imagem: infoEmpresa.imagem,
        likes: like,
        deslikes: deslike 
       }
       console.log(empresa)
       response.status(200).json(empresa)
    } catch (error) {
        console.log(error)
        response.status(500).json({err: "Erro ao buscar dados da empresa"})
    }
}

// export const create = async (request, response) => {
//     const {nome, imagem} = request.body

//     try{
//         await Empresa.create({ nome, imagem })
//         response.status(201).json("CRIADO")
//     }catch (error){
//         response.status(500).json({ err: error })
//     }
// }