const jwt =  require("jsonwebtoken")
const secret = require("../utils/JWTSecret")
const UserRepository = require("../repository/UserRepository")

module.exports = async (req, res, next) =>{
    const authToken = req.headers['authorization']

    // The bearer token don't exists in request headers
    if(authToken == undefined){
        return res.status(401).json({status: 401, message: "Usuário não autenticado"})
    }

    const token_split = authToken.split(' ')
    let token = token_split[1] // Token without bearer

    try{
        let decoded = jwt.verify(token, secret)

        // When id not exists in token
        if(!decoded.id){
            return res.status(401).json({status: 401,message: "Usuário não autenticado"})
        }
        
        // Verify the user role for authorizate the request
        const user = await UserRepository.find_one(decoded.id)
        if(user.role !== 1){
            return res.status(403).json({status: 403, message: "Usuário não permitido"})
        }

        // Permission allowed
        next()
    }catch(e){
        return res.status(401).json({status: 401,message: "Usuário não autenticado"})
    }
}