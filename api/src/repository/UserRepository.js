const database = require("../database/config")
const Slugify = require("slugify")
const bcrypt = require("bcrypt")
const salt =  parseInt(process.env.HASH_SALT)

class UserRepository{
    async find_all(){
        try{
            return await database.select(['user.id','user.name','user.email','user.role','user.created_at'])
            .table("user").orderBy('id', 'desc')
        }catch(error){
            console.log(error)
            throw error
        }
    }

    async find_one(id){
        try{
            let user = await database.select(['user.id','user.name','user.email','user.role','user.created_at'])
            .table("user").where({id})
            return user[0]
        }catch(error){
            console.log(error)
            throw error
        }
    }

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

    async create(name,email,password){
        let hash_password = await bcrypt.hash(password, salt)

        try{
            return await database.insert({
                name, email, password: hash_password, role:0
            }).table("user")
        }
        catch(error){
            console.log(error)
            throw error
        }
    }

    async verify_id(id){
        try{
            let findUser = await database.select().table("user").where({id})

            if(findUser.length > 0) return true
            else return false
        }
        catch(error){
            console.log(error)
            return false
        }
    }

    

    async delete(id){
        try{
            await database.delete().table("user").where({id})
        }
        catch(error){
            console.log(error)
        }
    }

    async update(id, name, email, password, role){
        try{
            let slug = Slugify(name).toLowerCase()

            // If the password not be passed, it will not change
            if(password == undefined || password == ''){
                try{
                    await database.where({id}).update({
                        name,
                        slug,
                        email,
                        role,
                        updated_at: new Date()
                    }).table("user")
                }catch(error){
                    console.log(error)
                }
            }
            // If password be passed, it will change
            else{
                let hash = await bcrypt.hash(password, salt)

                try{
                    await database.where({id}).update({
                        name,
                        slug,
                        email,
                        password: hash,
                        role,
                        updated_at: new Date()
                    }).table("user")
                }catch(error){
                    console.log(error)
                }
            }
        }
        catch(error){
            console.log(error)
            throw error
        }
    }

    async updatePassword(email,password){
        let newPassword = await bcrypt.hash(password, salt)
        try{
            await database.where({email}).table("user").update({password: newPassword,updated_at: new Date()})
        }catch(error){
            console.log(error)
        }
    }

    async validateUser(email, password){
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
        }
        
    }
}
module.exports = new UserRepository()