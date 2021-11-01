const slugify = require("slugify")
const database = require("../database/config")
const categoryConstants = require("../constants/categoryConstants")
const serverConstants = require("../constants/serverConstants")
const verifyData = require("../utils/verifyData")
const userConstants = require("../constants/userConstants")

class Category{

    // Get all categories
    async findAll(){
        try{
            let categories = await database.select(['category.*', 'user.name as user_name'])
            .table("category").orderBy('id', 'desc')
            .join('user', 'category.user_id', 'user.id')
            
            return {code: 200, response: categories}
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

    // Get one category by id
    async findById(categoryId){
        try{
            let category = await database.select(['category.*', 'user.name as user_name'])
            .from("category").where('category.id', categoryId)
            .join('user', 'category.user_id', 'user.id')
            
            if(category.length === 0)
                return {code: 404, response: {
                    status: 404,
                    message: categoryConstants.notFound
                }}

            return {code: 200, response: category[0]}
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

    // Get one category by slug
    async findBySlug(slug){
        try{
            let category = await database.select(['category.*', 'user.name as user_name'])
            .from("category").where('category.slug', slug)
            .join('user', 'category.user_id', 'user.id')

            if(category.length === 0)
                return {code: 404, response: {
                    status: 404,
                    message: categoryConstants.notFound
                }}

            return {code: 200, response: category[0]}
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

    // Create a category
    async create(name, userId){
        if(!verifyData.name(name) || !verifyData.id(userId)){
            return{ 
                code: 400, 
                response: {
                    status: 400,
                    message: serverConstants.invalidData
                }
            }
        }
        
        try{
            let findUser = await database.select().table("user").where({id: parseInt(userId)})
            if(findUser.length === 0) 
                return{code: 401, response: {
                    status: 404,
                    message: userConstants.userNotAuthenticated
                }}
            
            let slug = slugify(name).toLowerCase()

            let findCategory = await database.select().table("category").where({slug})
            if(findCategory.length > 0)
                return{ 
                code: 409, 
                response: {
                    status: 409,
                    message: categoryConstants.alreadyExists
                }}

            let cat = {name, slug, user_id: parseInt(userId)}
            await database.insert(cat).table("category")
            return {code: 201, response: cat}
        }
        catch(error){
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

    // Update a category
    async update(id, name){
        if(!verifyData.name(name) || !verifyData.id(id)){
            return{ 
                code: 400, 
                response: {
                    status: 400,
                    message: serverConstants.invalidData
                }
            }
        }

        try{

            let findCategory = await database.select().table("category").where({id})
            if(findCategory.length === 0)
                return{code: 404, response: {
                    status: 404,
                    message: categoryConstants.notFound
                }}

            let slug = slugify(name).toLowerCase()
            let findBySlug = await database.select().table("category").whereNot({id}).andWhere({slug})
            if(findBySlug.length > 0)
                return{ 
                    code: 409, 
                    response: {
                        status: 409,
                        message: categoryConstants.alreadyExists
                    }}
            
            await database.update({name, slug}).table("category").where({id})
            return {code: 204, response: undefined}
        }
        catch(error){
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

    // Delete a category
    async delete(id){
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
            
            let findCategory = await database.select().table("category").where({id})
            if(findCategory.length === 0)
                return{code: 404, response: {
                    status: 404,
                    message: categoryConstants.notFound
                }}

            await database.delete().table("category").where({id})
            return {code: 204, response: undefined}
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

module.exports = new Category()