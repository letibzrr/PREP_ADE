import jwt from "jsonwebtoken"

const createUserToken = (usuario, request, response) => {
    const token = jwt.sign(
        {   // palylod = userinfo
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            nickname: usuario.nickname }, //payload = informação do usuário 
        "SENHASUPERSEGURA", //senha
        { expiresIn: '24h'} //header = criptografia e tempo
    )

    response.status(200).json({
        message: "Você está logado",
        token,
        usuarioId: usuario.id
    })

    console.log('usuário =>',usuario)
    console.log('request =>', request)
    console.log('response =>',response)
}

export default createUserToken;