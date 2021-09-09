const Category = require("../models/Category")

class CategoryController{
    async findAll(req, res){
        let categories = await Category.findAll()
        res.json(categories)
    }

    async create(req, res){
        const {name} = req.body;

        if(name == undefined || name == ''){
            return res.status(401).json({msg: "Dados inválidos."})
        }

        let categoryExists = await Category.findByName(name)
        if(categoryExists){
            return res.status(406).json({msg: "Esta categoria já existe."})
        }

        await Category.create(name)
        res.json({status: "usuário criado com sucesso"})
    }

    async findOne(req, res){
        let id = req.params.id

        res.status(200).json({status: "Categoria encontrada"})
    }
}
module.exports = new CategoryController()