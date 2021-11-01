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
            let users = await database.select(['user.id','user.name','user.email','user.role','user.created_at', 'user.updated_at'])
            .table("user").orderBy('id', 'desc')

            return {code: 200,response: users}
        }catch(error){
            return{
                code: 500, 
                response: {
                    status: 500,
                    message:serverConstants.internalError
                }
            }
        }
    }

    async findOne(id){
        if(!verifyData.id(id)){
            return{ 
                code: 400, 
                response: {
                    status: 400,
                    message: serverConstants.invalidData
                }
            }
        }

        try{
            let user = await database.select(['user.id','user.name','user.email','user.role','user.created_at', 'user.updated_at'])
            .table("user").where({id: parseInt(id)})
            
            user = user[0]
            if(user == undefined){
                return { 
                    code: 404, 
                    response: {
                        status: 404,
                        message: userConstants.userNotFound
                    }
                }
            }
            
            return{code: 200,response: user}
        }catch(error){
            return{
                code: 500, 
                response: {
                    status: 500,
                    message:serverConstants.internalError
                }
            }
        }
    }
    
    async create(name,email,password){
        if(!verifyData.createUser(name,email,password) || !verifyData.minPassword(password)){
            return{ 
                code: 400, 
                response: {
                    status: 400,
                    message: serverConstants.invalidData
                }
            }
        }

        let findEmail = await database.select().table("user").where({email})
        if(findEmail.length > 0) 
            return{ 
                code: 409, 
                response: {
                    status: 409,
                    message: userConstants.userEmailExists
                }
            }

        let hash_password = await bcrypt.hash(password, salt)
        try{ 
            await database.insert({
                name, email, password: hash_password, role:0
            }).table("user")

            let userCreated = await database.select(['user.id','user.name','user.email','user.role','user.created_at', 'user.updated_at'])
            .table('user').where({email})
            
            return {code: 200, response: userCreated[0]}
        }
        catch(error){
            return{
                code: 500, 
                response: {
                    status: 500,
                    message:serverConstants.internalError
                }
            }
        }
    }

    async update(id, name, email, password, role){
        if(!verifyData.updateUser(name,email,role) || !verifyData.id(id)){
            return { 
                code: 400, 
                response: {
                    status: 400,
                    message: serverConstants.invalidData
                }
            }
        }
        
        try{
            let user_id = parseInt(id)
            let findUser = await database.select().table("user").where({id: user_id})
            if(findUser.length === 0) 
                return{ 
                    code: 404, 
                    response: {
                        status: 404,
                        message: userConstants.userNotFound
                    }
                }

            let findEmail = await database.select().table("user").whereNot({id}).andWhere({email})
            if(findEmail.length > 0) 
                return{ 
                    code: 409, 
                    response: {
                        status: 409,
                        message: userConstants.userEmailExists
                    }
                }
            
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
            return{code: 204, response: undefined}
        
        }catch(error){
            console.log(error)
            return{
                code: 500, 
                response: {
                    status: 500,
                    message:serverConstants.internalError
                }
            }
        }
    }
    
    async delete(id){
        if(!verifyData.id(id)){
            return { 
                code: 400, 
                response: {
                    status: 400,
                    message: serverConstants.invalidData
                }
            }
        }
        
        try{
            let findUser = await database.select().table("user").where({id: parseInt(id)})
            if(findUser.length === 0) 
                return{ 
                    code: 404, 
                    response: {
                        status: 404,
                        message: userConstants.userNotFound
                    }
                }

            await database.delete().table("user").where({id: parseInt(id)})
            return{code: 204, response: undefined}
        }
        catch(error){
            return{
                code: 500, 
                response: {
                    status: 500,
                    message:serverConstants.internalError
                }
            }
        }
    }

    async validateUser(email, password){
        if(!verifyData.email_Pass(email,password) ){
            return{ 
                code: 400, 
                response: {
                    status: 400,
                    message: serverConstants.invalidData
                }
            }
        }

        let user = await database.select().table("user").where({email})
        if(user.length === 0){
            return{ 
                code: 401, 
                response: {
                    status: 401,
                    message: userConstants.userIncorrect
                }
            }
        }
        user = user[0]

        try{
            let isPassword = await bcrypt.compare(password, user.password)

            if(!isPassword){
                return { 
                    code: 401, 
                    response: {
                        status: 401,
                        message: userConstants.userIncorrect
                    }
                }
            }

            let token = jwt.sign({id: user.id, name: user.name, email: user.email, role: user.role}, secret)
            return { 
                code: 200, 
                response: {
                    token,
                    user: {
                        id: user.id, 
                        name: user.name, 
                        email: user.email, 
                        role: user.role
                    }
                }
            }
        }catch(error){
            console.log(error)
            return{
                code: 500, 
                response: {
                    status: 500,
                    message:serverConstants.internalError
                }
            }
        }
        
    }
}
module.exports = new User()