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
        res.json({status: "Categoria criada com sucesso."})
    }

    async update(req, res){
        let id = req.params.id
        let name = req.body.name

        if((id == undefined || id == '') || (name == undefined || name == '')){
            return res.status(401).json({msg: "Dados inválidos."})
        }

        let nameExists = await Category.findBySlug(name)
        if(nameExists){
            return res.status(406).json({msg: "Esta categoria já existe."})
        }

        let categoryExists = await Category.findById(parseInt(id))
        if(!categoryExists){
            return res.status(404).json({msg: "Categoria não encontrada ou não existe."})
        }

        await Category.update(parseInt(id), name)
        res.status(200).json({status: "Categoria editada com sucesso."})
    }

    async findOne(req, res){
        let {id} = req.params

        if(id == undefined || id == ''){
            return res.status(401).json({msg:"Dados inválidos."})
        }

        let category = await Category.getById(parseInt(id))
        if(category == undefined){
            return res.status(404).json({msg: "Esta categoria não existe."})
        }

        res.status(200).json(category)
    }

    async delete(req, res){
        let id = req.params.id
        
        if(id == undefined || id == ''){
            return res.status(401).json({msg: "Dados inválidos."})
        }

        let categoryExists = await Category.findById(parseInt(id))
        if(!categoryExists){
            return res.status(404).json({msg: "Categoria não encontrada."})
        }

        await Category.delete(parseInt(id))
        res.status(200).json({status:"Categoria deletada com sucesso."})
    }
}
module.exports = new CategoryController()