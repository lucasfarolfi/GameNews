import Header from "../components/header";
import Footer from '../components/footer'
import { Container, Form, Button} from "react-bootstrap";
import styles from '../styles/form.module.scss'
import {registerUserSchema} from '../utils/userSchema'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import { useState } from "react";
import { registerUser } from "../services/users";

export default function Cadastro(){

    const [errorRegister, setErrorRegister] = useState(null)

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(registerUserSchema),
    })

    const registerSubmit = async (user) =>{
        try{
            await registerUser(`${user.firstName} ${user.lastName}`,user.email,user.password)
            window.location.href = "http://localhost:3000/"
        }
        catch(error){
            let msg = error.data.msg
            setErrorRegister(msg)
        }
    }

    return(
        <>
            <Header/>
            <Container>
                <main>
                    
                    <Form className={styles.form} onSubmit={handleSubmit(registerSubmit)}>
                        <h1>Cadastre-se</h1>
                        <Form.Group className="mt-3" controlId="formBasicFirstname">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Digite seu nome" {...register("firstName")} />
                        </Form.Group>
                        {errors.firstName?.message ? <Form.Text className="text-danger">{errors.firstName?.message}</Form.Text> : null}

                        <Form.Group className="mt-3" controlId="formBasicLastname">
                            <Form.Label>Sobrenome</Form.Label>
                            <Form.Control type="text" placeholder="Digite seu sobrenome" {...register("lastName")} />
                        </Form.Group>
                        {errors.lastName?.message ? <Form.Text className="text-danger">{errors.lastName?.message}</Form.Text> : null}

                        <Form.Group className="mt-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Digite seu e-mail" {...register("email")}  />
                        </Form.Group>
                        {errors.email?.message ? <Form.Text className="text-danger">{errors.email?.message}</Form.Text> : null}

                        <Form.Group className="mt-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Digite uma senha" {...register("password")}  />
                        </Form.Group>
                        {errors.password?.message ? <Form.Text className="text-danger">{errors.password?.message}</Form.Text> : null}
                        
                        <Form.Group className="mt-3" controlId="formBasicConfirm">
                            <Form.Label>Confirmar Senha</Form.Label>
                            <Form.Control type="password" placeholder="Confirme a senha" {...register("confirm")}  />
                        </Form.Group>
                        {errors.confirm?.message ? <Form.Text className="text-danger">{errors.confirm?.message}</Form.Text> : null}
                        
                        {errorRegister ? <Form.Text className="text-danger">
                            {errorRegister}
                        </Form.Text> : null}

                        <div className="d-grid gap-2 mt-4">
                            <Button variant="danger" size="lg" type="submit">
                                Cadastrar
                            </Button>
                        </div>              
                    
                    </Form>
                </main>
            </Container>
            <Footer/>
        </>
    )
}