const ServerConstants = require("../constants/ServerConstants")
const secret = require("../utils/JWTSecret")
const jwt = require("jsonwebtoken")
const LoginRepository = require("../repository/LoginRepository")
const { validationResult } = require("express-validator")
const LoginConstants = require("../constants/LoginConstants")

class LoginController{
    async login(req, res){
        try{
            let {email, password} = req.body
            
            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: LoginConstants.INVALID_DATA})
            }
            
            let user = await LoginRepository.authenticate(email, password)
            
            if(user == undefined){
                return res.status(406).json({msg: LoginConstants.INCORRECT_LOGIN})
            }
            
            let token = jwt.sign({id: user.id, name: user.name, email: user.email, role: user.role}, secret)
            res.status(200).json({token: token})
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }
}

module.exports = new LoginController()