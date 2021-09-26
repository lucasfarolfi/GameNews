const jwt =  require("jsonwebtoken")
const secret = require("../utils/JWTSecret")

module.exports = (req, res, next) =>{
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        const bearer = authToken.split(' ')
        let token = bearer[1]

        try{
            let decoded = jwt.verify(token, secret)

            if(decoded.role === 2){
                next()
            }
            else{
                return res.status(401).json({msg: "Usuário não permitido"})
            }
        }catch(e){
            return res.status(401).json({msg: "Usuário não autenticado"})
        }
    }
    else{
        return res.status(401).json({msg: "Usuário não autenticado"})
    }
}