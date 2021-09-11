import { setLocale, object,string, ref} from 'yup'
import {ptForm} from 'yup-locale-pt'

setLocale(ptForm)

export const editCategorySchema = object().shape({
    name: string().required()
})

export const registerCategorySchema = object().shape({
    name: string().required()
})