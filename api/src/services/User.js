const database = require("../database/config")
const bcrypt = require("bcrypt")
const salt =  parseInt(process.env.HASH_SALT)
const verifyData = require("../utils/verifyData")
const userConstants = require("../constants/userConstants")
const serverConstants = require("../constants/serverConstants")
const jwt = require("jsonwebtoken")
const secret = require("../utils/JWTSecret")

class User{
    async findAll(){
        try{
            let users = await database.select(['user.id','user.name','user.email','user.role','user.created_at'])
            .table("user").orderBy('id', 'desc')

            if(users.length === 0){
                return {status: true,code: 200,msg: userConstants.usersNotFound}
            }

            return {status: true,code: 200,users}
        }catch(error){
            return{status: false,code: 500, msg: serverConstants.internalError}
        }
    }

    async findOne(id){
        if(!verifyData.id(id)){
            return{status: false,code: 400,msg: serverConstants.invalidData}
        }

        try{
            let user = await database.select(['user.id','user.name','user.email','user.role','user.created_at'])
            .table("user").where({id: parseInt(id)})
            
            user = user[0]
            if(user == undefined){
                return {status: false,code: 404,msg: userConstants.userNotFound,}
            }
            
            return{status: true,code: 200,user}
        }catch(error){
            return{status: false,code: 500, msg: serverConstants.internalError}
        }
    }
    
    async create(name,email,password){
        if(!verifyData.createUser(name,email,password) || !verifyData.minPassword(password)){
            if(!verifyData.minPassword(password)){
                return{status: false,code: 400, msg: userConstants.userSmallPassword}
            }
            return{status: false,code: 400, msg: serverConstants.invalidData}
        }

        let findEmail = await database.select().table("user").where({email})
        if(findEmail.length > 0) return{status: false,code: 406, msg: userConstants.userEmailExists}

        let hash_password = await bcrypt.hash(password, salt)
        try{ 
            await database.insert({
                name, email, password: hash_password, role:0
            }).table("user")
            
            return {status: true,code: 200, msg: userConstants.userCreateSuccess}
        }
        catch(error){
            return{status: false,code: 500, msg: serverConstants.internalError}
        }
    }

    async update(id, name, email, password, role){
        if(!verifyData.updateUser(name,email,role) || !verifyData.id(id)){
            return {status: false,code: 400, msg: serverConstants.invalidData}
        }
        
        try{
            let user_id = parseInt(id)
            let findUser = await database.select().table("user").where({id: user_id})
            if(findUser.length === 0) return{status: false,code: 404, msg: userConstants.userNotFound}

            let findEmail = await database.select().table("user").whereNot({id}).andWhere({email})
            if(findEmail.length > 0) return{status: false,code: 406, msg: userConstants.userEmailExists}
            
            if(password == undefined || password == ''){
                await database.where({id: user_id}).update({
                    name,
                    email,
                    role: parseInt(role),
                    updated_at: new Date()
                }).table("user")
            }
            else{
                let hash = await bcrypt.hash(password, salt)
                await database.where({id: user_id}).update({
                    name,
                    email,
                    password: hash,
                    role: parseInt(role),
                    updated_at: new Date()
                }).table("user")
            }
            return{status: true,code: 200, msg: userConstants.userUpdateSuccess}
        
        }catch(error){
            console.log(error)
            return{status: false,code: 500, msg: serverConstants.internalError}
        }
    }

    async updatePassword(email,password){
        if(!verifyData.email_Pass(email,password) || !verifyData.minPassword(password)){
            if(!verifyData.minPassword(password)){
                return{status: false,code: 400, msg: userConstants.userSmallPassword}
            }
            return{status: false,code: 400, msg: serverConstants.invalidData}
        }
        
        try{
            let findEmail = await database.select().table("user").where({email})
            if(findEmail.length === 0) return{status: false,code: 406, msg: userConstants.userNotFound}

            let newPassword = await bcrypt.hash(password, salt)
            await database.where({email}).table("user").update({password: newPassword,updated_at: new Date()})
        
            return {status: true,code: 200, msg: userConstants.userUpdateSuccess}
        }catch(error){
            return{status: false,code: 500, msg: serverConstants.internalError}
        }
    }
    
    async delete(id){
        if(!verifyData.id(id)){
            return {status: false,code: 400, msg: serverConstants.invalidData}
        }
        
        try{
            let findUser = await database.select().table("user").where({id: parseInt(id)})
            if(findUser.length === 0) return{status: false,code: 404, msg: userConstants.userNotFound}

            await database.delete().table("user").where({id: parseInt(id)})
            return{status: true,code: 200, msg: userConstants.userDeleteSuccess}
        }
        catch(error){
            return{status: false,code: 500, msg: serverConstants.internalError}
        }
    }

    async validateUser(email, password){
        if(!verifyData.email_Pass(email,password) ){
            return{status: false,code: 400, msg: serverConstants.invalidData}
        }

        let user = await database.select().table("user").where({email})
        if(user.length === 0){
            return{status: false,code: 404, msg: userConstants.userIncorrect}
        }
        user = user[0]

        try{
            let isPassword = await bcrypt.compare(password, user.password)

            if(!isPassword){
                return {status: false,code: 406, msg: userConstants.userIncorrectPassword}
            }

            let token = jwt.sign({id: user.id, name: user.name, email: user.email, role: user.role}, secret)
            return {status: true,code: 200, token}
        }catch(error){console.log(error)
            return{status: false,code: 500, msg: serverConstants.internalError}
        }
        
    }
}
module.exports = new User()