import Header from "../../../../components/header";
import Footer from "../../../../components/footer"
import { Container, Form, Button} from "react-bootstrap";
import styles from '../../../../styles/form.module.scss'
import {registerNewsSchema} from '../../../../utils/newsSchema'
import { getNewsById, updateNews } from "../../../../services/news";
import {useState, useEffect} from 'react'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'

export function getServerSideProps(context) {
    return {
      props: {params: context.params}
    };
}

export default function Novo({params}){
    const [errorRegister, setErrorRegister] = useState(null)
    const [queryId, setQueryId] = useState(params.id)
    const [news, setNews] = useState({})
    const [load, setLoad] = useState(false)

    useEffect(async ()=>{
        try{
            let getNews = await getNewsById(queryId)
            setNews(getNews)
            setLoad(true)
        }catch(error){
            let msg = error.data.msg
            setErrorRegister(msg)
        }
    },[])

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(registerNewsSchema),
    })

    const editSubmit = async (newsSubmit) =>{
        if(news.title === newsSubmit.title && news.category === newsSubmit.category && news.body === newsSubmit.body){
            setErrorRegister("É necessário modificar algum dado para editar.")
        }
        else{
            try{
                await updateNews(queryId, newsSubmit.title, newsSubmit.category, newsSubmit.body)
                window.location.href = 'http://localhost:3000/admin/noticias'
            }catch(error){
                let msg = error.data.msg
                setErrorRegister(msg)
            }
        }
    }

    return(
        <>
            <Header/>
            <Container>
                <main>
                    
                {load === true ? <Form className={styles.form} onSubmit={handleSubmit(editSubmit)}>
                        <h1>Editar notícia</h1>   

                        <Form.Group className="mt-3" controlId="formBasicTitlel">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" placeholder="Digite o título da notícia"{...register("title")} defaultValue={news.title}/>
                        </Form.Group>
                        {errors.title?.message ? <Form.Text className="text-danger">{errors.title?.message}</Form.Text> : null}

                        <Form.Group className="mt-3" controlId="formBasicCategory">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control type="text" placeholder="Digite a Categoria"{...register("category")}  defaultValue={news.category}/>
                        </Form.Group>
                        {errors.category?.message ? <Form.Text className="text-danger">{errors.category?.message}</Form.Text> : null}
                        
                        <Form.Group className="mt-3" controlId="formBasicBody">
                            <Form.Label>Corpo</Form.Label>
                            <Form.Control as="textarea" placeholder="Digite o corpo da notícia" rows={6} {...register("body")} defaultValue={news.body}/>
                        </Form.Group>
                        {errors.body?.message ? <Form.Text className="text-danger">{errors.body?.message}</Form.Text> : null}

                        {errorRegister ? <Form.Text className="text-danger">{errorRegister}</Form.Text> : null}
                        <div className="d-grid gap-2 mt-4">
                            <Button variant="danger" size="lg" type="submit">
                                Cadastrar notícia
                            </Button>
                        </div>              
                    
                    </Form> : null }
                </main>
            </Container>
            <Footer/>
        </>
    )
}