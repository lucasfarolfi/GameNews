const slugify = require("slugify")
const database = require("../database/config")
const categoryConstants = require("../constants/categoryConstants")
const serverConstants = require("../constants/serverConstants")
const verifyData = require("../utils/verifyData")
const userConstants = require("../constants/userConstants")

class Category{
    async findAll(user = undefined){
        if(user == undefined){
            try{
                let categories = await database.select(['category.*', 'user.name as user_name'])
                .table("category").orderBy('id', 'desc')
                .join('user', 'category.user_id', 'user.id')
                
                 if(categories.length === 0){
                    return {status: true,code: 200,msg: categoryConstants.categoriesNotRegistered}
                }
                return {status: true,code: 200, categories}
            }
            catch(error){
                return{status: false,code: 500, msg: serverConstants.internalError}
            }
        }else{
            if(!verifyData.id(user)){
                return{status: false,code: 400,msg: serverConstants.invalidData}
            }
            
            try{
                let findUser = await database.select().table("user").where({id: parseInt(user)})
                if(findUser.length === 0) return{status: false,code: 404, msg: userConstants.userNotFound}

                let categories = await database.select(['category.*', 'user.name as user_name'])
                .table("category").orderBy('id', 'desc')
                .join('user', 'category.user_id', 'user.id')
                .where({user_id: parseInt(user)})

                if(categories.length === 0){
                    return {status: true,code: 200,msg: categoryConstants.categoriesNotRegistered}
                }
                return {status: true,code: 200, categories}
            }
            catch(error){
                return{status: false,code: 500, msg: serverConstants.internalError}
            }
        }
        
    }

    async findById(categoryId){
        try{
            let category = await database.select(['category.*', 'user.name as user_name'])
            .from("category").where('category.id', categoryId)
            .join('user', 'category.user_id', 'user.id')

            if(category.length === 0)return {status: true,code: 200,msg: categoryConstants.notFound}

            return {status: true,code: 200, category: category[0]}
        }catch(error){
            console.log(error)
            return{status: false,code: 500, msg: serverConstants.internalError}
        }
    }

    async findBySlug(slug){
        try{
            let category = await database.select(['category.*', 'user.name as user_name'])
            .from("category").where('category.slug', slug)
            .join('user', 'category.user_id', 'user.id')

            if(category.length === 0)return {status: true,code: 200,msg: categoryConstants.notFound}

            return {status: true,code: 200, category: category[0]}
        }catch(error){
            console.log(error)
            return{status: false,code: 500, msg: serverConstants.internalError}
        }
    }

    async create(name, userId){
        if(!verifyData.name(name) || !verifyData.id(userId)){
            return{status: false,code: 400, msg: serverConstants.invalidData}
        }
        
        try{
            let findUser = await database.select().table("user").where({id: parseInt(userId)})
            if(findUser.length === 0) return{status: false,code: 404, msg: userConstants.userNotFound}
            
            let slug = slugify(name).toLowerCase()

            let findCategory = await database.select().table("category").where({slug})
            if(findCategory.length > 0)return{status: false,code: 406, msg: categoryConstants.alreadyExists}

            await database.insert({name, slug, user_id: parseInt(userId)}).table("category")
            return {status: true,code: 200, msg: categoryConstants.createdSuccess}
        }
        catch(error){
            console.log(error)
            return{status: false,code: 500, msg: serverConstants.internalError}
        }
    }

    async update(id, name){ console.log({id, name})
        if(!verifyData.name(name) || !verifyData.id(id)){
            return{status: false,code: 400, msg: serverConstants.invalidData}
        }

        try{
            let findCategory = await database.select().table("category").where({id})
            if(findCategory.length === 0)return{status: false,code: 404, msg: categoryConstants.notFound}

            let slug = slugify(name).toLowerCase()
            let findBySlug = await database.select().table("category").whereNot({id}).andWhere({slug})
            if(findBySlug.length > 0)return{status: false,code: 406, msg: categoryConstants.alreadyExists}

            await database.update({name, slug}).table("category").where({id})

            return {status: true,code: 200, msg: categoryConstants.updatedSuccess}
        }
        catch(error){
            console.log(error)
            return{status: false,code: 500, msg: serverConstants.internalError}
        }
    }

    async delete(id){
        if(!verifyData.id(id)){
            return{status: false,code: 400, msg: serverConstants.invalidData}
        }

        try{
            let findCategory = await database.select().table("category").where({id})
            if(findCategory.length === 0)return{status: false,code: 404, msg: categoryConstants.notFound}

            await database.delete().table("category").where({id})
            return {status: true,code: 200, msg: categoryConstants.deletedSuccess}
        }catch(error){
            console.log(error)
            return{status: false,code: 500, msg: serverConstants.internalError}
        }
    }

}
module.exports = new Category()