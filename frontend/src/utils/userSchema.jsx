import { setLocale, object,string, ref} from 'yup'
import {ptForm} from 'yup-locale-pt'

setLocale(ptForm)

export const registerUserSchema = object().shape({
    firstName: string().required(),
    lastName: string().required(),
    email: string().required().email(),
    password: string().required().min(8, "A senha precisa ter no mínimo 8 caracteres."),
    confirm: string().required().oneOf([ref("password"), null], "As senhas devem ser iguais.")
})

export const loginUserSchema = object().shape({
    email: string().required().email(),
    password: string().required()
})

export const updateUserResolver = object().shape({
    name: string().required(),
    email: string().required().email(),
    role: string().required(),
    password: string().test('A senha deve ser vazia ou deve conter 8 caracteres.',
    'A senha precisa ter pelo menos 8 caracteres.',
    password => !password || password.length >= 8)
})