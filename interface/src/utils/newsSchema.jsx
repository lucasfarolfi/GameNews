import { object,string } from 'yup'

export const registerNewsSchema = object().shape({
    title: string("Título inválido").required("Título obrigatório"),
    category: string("Categoria inválida").required("Categoria obrigatória"),
    body: string("Corpo inválido").required("Corpo obrigatório").min(100, "O corpo deve ter no mínimo 100 caracteres")
})