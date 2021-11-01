const jwt =  require("jsonwebtoken")
const secret = require("../utils/JWTSecret")

module.exports = (req, res, next) =>{
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        const bearer = authToken.split(' ')
        let token = bearer[1]

        try{
            let decoded = jwt.verify(token, secret)

            if(decoded.role === 2 || decode.role === 1){
                next()
            }
            else{
                return res.status(403).json({status: 403, message: "Usuário não permitido"})
            }
        }catch(e){
            return res.status(401).json({status: 401, message: "Usuário não autenticado"})
        }
    }
    else{
        return res.status(401).json({status: 401, message: "Usuário não autenticado"})
    }
}