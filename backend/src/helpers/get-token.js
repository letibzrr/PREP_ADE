const getToken = (request) => {
    const auth = request.headers.authorization // Bearer token
    const token = auth.split(" ")[1] //dividir o bearer do token
    return token
}

export default getToken