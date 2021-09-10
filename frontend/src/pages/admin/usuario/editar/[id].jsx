import Header from "../../../../components/header";
import Footer from '../../../../components/footer'
import { Container, Form, Button} from "react-bootstrap";
import styles from '../../../../styles/form.module.scss'
import { useEffect, useState } from "react";
import {getUserById} from '../../../../services/users'
import {updateUserResolver} from '../../../../utils/userSchema'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import { updateUser } from "../../../../services/users";

export function getServerSideProps(context) {
    return {
      props: {params: context.params}
    };
}

export default function EditUser({params}){

    const {id} = params
    const [load, setLoad] = useState(false)
    const [user, setUser] = useState({})
    const [queryId, setQueryId] = useState(id)
    const [errorRegister, setErrorRegister] = useState(null)
    
    useEffect(async()=>{
        try{
            let getUser = await getUserById(queryId)
            setUser(getUser)
            setLoad(true)
        }catch(err){
            let msg = err.data.msg
            setErrorRegister(msg)
        }
    },[])

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(updateUserResolver),
    })

    const updateSubmit = async (user) =>{
        try{
            await updateUser(queryId, user.name, user.email, user.role, user.password)
            window.location.href = 'http://localhost:3000/admin/usuarios'
        }catch(error){
            let msg = error.data.msg
            setErrorRegister(msg)
        }
    }

    return(
        <>
            <Header/>
            <Container>
                <main>
                    {load === true &&<Form className={styles.form} onSubmit={handleSubmit(updateSubmit)}>
                        <h1>Editar usuario</h1>
                        <Form.Group className="mb-3" controlId="formBasicFirstname">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome completo" defaultValue={user.name} {...register("name")}/>  
                        </Form.Group>
                        {errors.name?.message ? <Form.Text className="text-danger">{errors.name?.message}</Form.Text> : null}

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Digite o email" defaultValue={user.email} {...register("email")} />
                        </Form.Group>
                        {errors.email?.message ? <Form.Text className="text-danger">{errors.email?.message}</Form.Text> : null}

                        <Form.Group className="mb-3" controlId="formBasicRole">
                            <Form.Label>Cargo</Form.Label>
                            <Form.Select defaultValue={user.role}{...register("role")}> 
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                            </Form.Select>
                        </Form.Group>
                        {errors.role?.message ? <Form.Text className="text-danger">{errors.role?.message}</Form.Text> : null}
                        
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Digite uma senha nova (opcional)"  {...register("password")}/>
                            <Form.Text className="text-muted">
                            Obs: Se não quiser alterar a senha, deixe o campo vazio.
                            </Form.Text>
                        </Form.Group>
                        {errors.password?.message ? <Form.Text className="text-danger">{errors.password?.message}</Form.Text> : null}

                        {errorRegister ? <Form.Text className="text-danger">
                            {errorRegister}
                        </Form.Text> : null}

                        <div className="d-grid gap-2 mt-4">
                            <Button variant="danger" size="lg" type="submit">
                                Editar
                            </Button>
                        </div>              
                    
                    </Form>}
                </main>
            </Container>
            <Footer/>
        </>
    )
}