const database = require("../database/config")
const bcrypt = require("bcrypt")

class LoginRepository{
    async verify_email(email){
        try{
            let findEmail = await database.select().table("user").where({email})

            if(findEmail.length > 0) return true
            else return false
        }
        catch(error){
            console.log(error)
            return false
        }
    }

    async validate_user(email, password){
        let user = await database.select().table("user").where({email})
        user = user[0]

        try{
            let isPassword = await bcrypt.compare(password, user.password)

            if(!isPassword){
                return undefined
            }

            return {
                id:user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }catch(error){
            console.log(error)
            return undefined
        }
        
    }
}
module.exports = new LoginRepository()