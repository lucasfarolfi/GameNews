const jwt =  require("jsonwebtoken")
const secret = require("../utils/JWTSecret")
const UserRepository = require("../repository/UserRepository")
const ServerConstants = require("../constants/ServerConstants")

function Authorization(roles){
    const rolesAuthorized = async (req, res, next) =>{
        const authToken = req.headers['authorization']
    
        // The bearer token don't exists in request headers
        if(authToken == undefined){
            return res.status(401).json({msg: ServerConstants.NOT_AUTHETICATED})
        }
    
        try{
            const token_split = authToken.split(' ')
            let token = token_split[1] // Token without bearer

            let decoded = jwt.verify(token, secret)
    
            // When id not exists in token
            if(!decoded.id){
                return res.status(401).json({msg: ServerConstants.NOT_AUTHETICATED})
            }
            
            // Verify the user role for authorizate the request
            const user = await UserRepository.find_one(decoded.id)

            const is_authorized = roles.includes(user.role)
            if(!is_authorized){
                return res.status(403).json({msg: ServerConstants.NOT_AUTHORIZED})
            }
    
            // Permission allowed
            next()
        }catch(e){
            return res.status(401).json({msg: ServerConstants.NOT_AUTHETICATED})
        }
    }

    return rolesAuthorized;
}

module.exports = Authorization