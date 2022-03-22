import { object,string } from 'yup'

export const editCategorySchema = object().shape({
    name: string("Nome inválido").required("Nome obrigatório")
})

export const registerCategorySchema = object().shape({
    name: string("Nome inválido").required("Nome obrigatório")
})