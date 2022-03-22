import Header from "../../../../components/header";
import Footer from '../../../../components/footer'
import { Container, Form, Button} from "react-bootstrap";
import styles from '../../../../styles/form.module.scss'
import { useEffect, useState } from "react";
import {editCategorySchema} from '../../../../utils/categorySchema'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import { createCategory } from "../../../../services/categories";

export default function CreateCategory(){
    const [errorRegister, setErrorRegister] = useState(null)

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(editCategorySchema),
    })

    const createSubmit = async (categ) =>{
        try{
            await createCategory(categ.name)
            window.location.href = 'http://localhost:3000/admin/categorias'
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
                <Form className={styles.form} onSubmit={handleSubmit(createSubmit)}>
                        <h1>Criar categoria</h1>
                        <Form.Group className="mt-3" controlId="formBasicName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome da categoria"{...register("name")}/>  
                        </Form.Group>
                        {errors.name?.message ? <Form.Text className="text-danger">{errors.name?.message}</Form.Text> : null}

                        {errorRegister ? <Form.Text className="text-danger">
                            {errorRegister}
                        </Form.Text> : null}

                        <div className="d-grid gap-2 mt-4">
                            <Button variant="danger" size="lg" type="submit">
                                Criar
                            </Button>
                        </div>              
                    
                    </Form>
                </main>
            </Container>
            <Footer/>
        </>
    )
}