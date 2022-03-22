import { object,string, ref} from 'yup'

export const registerUserSchema = object().shape({
    firstName: string("Nome inválido").required("Nome obrigatório"),
    lastName: string("Sobrenome inválido").required("Sobrenome obrigatório"),
    email: string("E-mail inválido").required("E-mail obrigatório").email("E-mail inválido"),
    password: string("Senha inválida").required("Senha obrigatória").min(8, "A senha precisa ter no mínimo 8 caracteres."),
    confirm: string("Confirmar senha inválido").required("Confirmar senha obrigatório").oneOf([ref("password"), null], "As senhas devem ser iguais.")
})

export const loginUserSchema = object().shape({
    email: string("E-mail inválido").required("E-mail obrigatório").email("E-mail inválido"),
    password: string("Senha inválida").required("Senha obrigatória")
})

export const updateUserResolver = object().shape({
    name: string("Nome inválido").required("Nome obrigatório"),
    email: string("E-mail inválido").required("E-mail obrigatório").email("E-mail inválido"),
    role: string("Cargo inválido").required("Cargo obrigatório"),
    password: string("Senha inválida").test('A senha deve ser vazia ou deve conter 8 caracteres.',
    'A senha precisa ter pelo menos 8 caracteres.',
    password => !password || password.length >= 8)
})