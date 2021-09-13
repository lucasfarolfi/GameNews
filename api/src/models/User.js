const database = require("../database/config")
const Slugify = require("slugify")
const bcrypt = require("bcrypt")

class User{
    async create(name,email,password){
        let slug = Slugify(name).toLowerCase()
        let hash_password = await bcrypt.hash(password, 10)
        try{
            return await database.insert({
                name, slug, email, password: hash_password, created_at: new Date(), role:0
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
                    slug,
                    email,
                    role,
                    updated_at: new Date()
                }).table("user")
            }catch(error){
                console.log(error)
            }
        }
        else{
            let hash = await bcrypt.hash(password, 10)

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

    async updatePassword(email,password){
        let newPassword = await bcrypt.hash(password, 10)
        try{
            await database.where({email}).table("user").update({password: newPassword,updated_at: new Date()})
        }catch(error){
            console.log(error)
        }
    }

    async findAll(){
        try{
            return await database.select().table("user").orderBy('id', 'desc')
        }catch(error){
            console.log(error)
        }
    }

    async findOne(id){
        try{
            return await database.select().table("user").where({id})
        }catch(error){
            console.log(error)
        }
    }

    async findByEmail(email){
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

    async findById(id){
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

    async getByEmail(email){
        try{
            return await database.select().table("user").where({email})
        }catch(error){
            console.log(error)
        }
    }

    async validateUser(email, password){
        let user = await this.getByEmail(email)
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
module.exports = new User()