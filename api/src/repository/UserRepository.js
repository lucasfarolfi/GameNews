const database = require("../database/config")
const Slugify = require("slugify")
const bcrypt = require("bcrypt")
const salt =  parseInt(process.env.HASH_SALT)
const {v4: uuidv4} = require('uuid')
const ERole = require("../utils/ERole")

class UserRepository{
    async find_all(search){
        try{
            return await database.select(['user.id','user.name','user.email','user.role','user.created_at'])
            .table("user").orderBy('created_at', 'desc')
            .whereRaw(`LOWER(name) LIKE ?`, `%${search.toLowerCase()}%`)
        }catch(e){
            console.log(e)
            throw e
        }
    }

    async find_one(id){
        try{
            let user = await database.select(['user.id','user.name','user.email','user.role','user.created_at'])
            .table("user").where({id})
            return user[0]
        }catch(e){
            console.log(e)
            throw e
        }
    }

    async verify_email(email){
        try{
            let findEmail = await database.select().table("user").where({email})

            if(findEmail.length > 0) return true
            else return false
        }
        catch(e){
            console.log(e)
            throw e
        }
    }

    async verify_id(id){
        try{
            let findUser = await database.select().table("user").where({id})

            if(findUser.length > 0) return true
            else return false
        }
        catch(e){
            console.log(e)
            throw e
        }
    }

    async create(name,email,password){
        let slug = Slugify(name).toLowerCase()
        let hash_password = await bcrypt.hash(password, salt)
        try{
            return await database.insert({
                id: uuidv4(), name, slug, email, password: hash_password, role: ERole.CLIENT
            }).table("user")
        }
        catch(e){
            console.log(e)
            throw e
        }
    }

    async delete(id){
        try{
            await database.delete().table("user").where({id})
        }
        catch(e){
            console.log(e)
            throw e
        }
    }

    async update(id, name, email, password, role){
        let slug = Slugify(name).toLowerCase()

        if(password == undefined || password == ''){
            try{
                await database.where({id}).update({
                    name,
                    slug,
                    email,
                    role,
                    updated_at: new Date()
                }).table("user")
            }catch(e){
                console.log(e)
            throw e
            }
        }
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
            }catch(e){
                console.log(e)
            throw e
            }
        }
        
    }

    async count_all(){
        try{
            let count =  await database.count().table("user")
            return parseInt(count[0].count)
        }
        catch(e){
            console.log(e)
            throw e
        }
    }
}
module.exports = new UserRepository()