import Header from "../../../../components/header";
import Footer from "../../../../components/footer"
import { Container, Form, Button} from "react-bootstrap";
import styles from '../../../../styles/form.module.scss'
import {registerNewsSchema} from '../../../../utils/newsSchema'
import { createNews } from "../../../../services/news";
import {useState} from 'react'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'

export default function Novo(){
    const [errorRegister, setErrorRegister] = useState(null)

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(registerNewsSchema),
    })

    const createSubmit = async (news) =>{
        try{
            await createNews(news.title, news.category, news.body)
            window.location.href = 'http://localhost:3000/admin/noticias'
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
                        <h1>Cadastre sua notícia</h1>   

                        <Form.Group className="mt-3" controlId="formBasicTitlel">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" placeholder="Digite o título da notícia"{...register("title")} />
                        </Form.Group>
                        {errors.title?.message ? <Form.Text className="text-danger">{errors.title?.message}</Form.Text> : null}

                        <Form.Group className="mt-3" controlId="formBasicCategory">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control type="text" placeholder="Digite a Categoria"{...register("category")} />
                        </Form.Group>
                        {errors.category?.message ? <Form.Text className="text-danger">{errors.category?.message}</Form.Text> : null}
                        
                        <Form.Group className="mt-3" controlId="formBasicBody">
                            <Form.Label>Corpo</Form.Label>
                            <Form.Control as="textarea" placeholder="Digite o corpo da notícia" rows={6} {...register("body")}/>
                        </Form.Group>
                        {errors.body?.message ? <Form.Text className="text-danger">{errors.body?.message}</Form.Text> : null}

                        {errorRegister ? <Form.Text className="text-danger">{errorRegister}</Form.Text> : null}
                        <div className="d-grid gap-2 mt-4">
                            <Button variant="danger" size="lg" type="submit">
                                Cadastrar notícia
                            </Button>
                        </div>              
                    
                    </Form>
                </main>
            </Container>
            <Footer/>
        </>
    )
}