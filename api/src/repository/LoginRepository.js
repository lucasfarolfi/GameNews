const database = require("../database/config")
const bcrypt = require("bcrypt")

class LoginRepository{
    async authenticate(email, password){
        let user = {}

        try{
            user = await database.select().table("user").where({email})
            if(user.length === 0){
                return undefined
            }

            user = user[0]

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
            throw error
        }
    }
}
module.exports = new LoginRepository()