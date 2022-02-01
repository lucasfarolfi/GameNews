const LoginService = require("../services/LoginService")
const serverConstants = require("../constants/serverConstants")

class LoginController{
    
    async login(req, res){
        try{
            let response = await LoginService.login(req)
            return res.status(response.status).json(response.data)
        }catch(e){
            return res.status(500).json({msg: serverConstants.internalError})
        }
    }
}

module.exports = new LoginController()