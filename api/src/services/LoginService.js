const LoginRepository = require("../repository/LoginRepository")
const LoginConstants = require("../constants/LoginConstants")
const serverConstants = require("../constants/serverConstants")
const secret = require("../utils/JWTSecret")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

class LoginService{
    
    async login(req){
        try{
            let {email, password} = req.body

            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return {status: 400, data: {msg: LoginConstants.INVALID_DATA}}
            }

            let findEmail = await LoginRepository.verify_email(email)
            if(!findEmail){
                return {status: 403, data: {msg: LoginConstants.INCORRECT_LOGIN}}
            }
            
            let user = await LoginRepository.validate_user(email, password)
            if(user == undefined){
                return {status: 403, data: {msg: LoginConstants.INCORRECT_LOGIN}}
            }
            
            let token = jwt.sign({id: user.id, name: user.name, email: user.email, role: user.role}, secret)
            return {status: 200, data: {token: token} }
        }catch(e){
            return {status: 500, data: {msg: serverConstants.internalError}}
        }
    }
}

module.exports = new LoginService()