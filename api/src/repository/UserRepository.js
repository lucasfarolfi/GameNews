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

    async create(name,email,password){
        let slug = Slugify(name).toLowerCase()
        let hash_password = await bcrypt.hash(password, salt)
        try{
            return await database.insert({
                name, slug, email, password: hash_password, role:0
            }).table("user")
        }
        catch(error){
            console.log(error)
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
        let slug = Slugify(name).toLowerCase()

        if(password == undefined || password == ''){
            try{
                await database.where({id}).update({
                    name,
                    email,
                    role,
                    updated_at: new Date()
                }).table("user")
            }catch(error){
                console.log(error)
                throw error
            }
        }
        else{
            let hash = await bcrypt.hash(password, salt)

            try{
                await database.where({id}).update({
                    name,
                    email,
                    password: hash,
                    role,
                    updated_at: new Date()
                }).table("user")
            }catch(error){
                console.log(error)
                throw error
            }
        }
        
    }
}
module.exports = new UserRepository()