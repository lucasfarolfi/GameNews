import { setLocale, object,string, ref} from 'yup'
import {ptForm} from 'yup-locale-pt'

setLocale(ptForm)

export const registerNewsSchema = object().shape({
    title: string().required(),
    category: string().required(),
    body: string().required().min(100)
})