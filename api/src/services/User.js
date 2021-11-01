const database = require("../database/config")
const bcrypt = require("bcrypt")
const salt =  parseInt(process.env.HASH_SALT)
const verifyData = require("../utils/verifyData")
const userConstants = require("../constants/userConstants")
const serverConstants = require("../constants/serverConstants")
const jwt = require("jsonwebtoken")
const secret = require("../utils/JWTSecret")

class User{

    // Get all users
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

    // Get one user
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
    
    // Create a user
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

    // Update a user
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
    
    // Delete a user
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

    // Login
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

    // Get all categories created by user
    async findCategories(userId, userAuthId, userAuthRole){
        if(!verifyData.id(userId) || !verifyData.id(userAuthId) || !verifyData.id(userAuthRole)){
            return { 
                code: 400, 
                response: {
                    status: 400,
                    message: serverConstants.invalidData
                }
            }
        } else if ((userAuthRole !== 2) && (parseInt(userId) !== userAuthId)){
            return { 
                code: 403, 
                response: {
                    status: 403,
                    message: userConstants.userNotAllowed
                }
            }
        }
        
        try{
            let categories = await database.select().table("category").where({user_id: parseInt(userId)}).orderBy('id', 'desc')
            return{code: 200, response: categories}
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

    // Get all News created by user
    async findNews(userId, userAuthId, userAuthRole){ 
        if(!verifyData.id(userId) || !verifyData.id(userAuthId) || !verifyData.id(userAuthRole)){
            return { 
                code: 400, 
                response: {
                    status: 400,
                    message: serverConstants.invalidData
                }
            }
        } else if ((userAuthRole !== 2) && (parseInt(userId) !== userAuthId)){
            return { 
                code: 403, 
                response: {
                    status: 403,
                    message: userConstants.userNotAllowed
                }
            }
        }
        
        try{
            let news = await database.select().table("news").where({user_id: parseInt(userId)}).orderBy('id', 'desc')
            return{code: 200, response: news}
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
}
module.exports = new User()