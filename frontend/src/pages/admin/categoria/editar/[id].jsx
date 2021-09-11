import Header from "../../../../components/header";
import Footer from '../../../../components/footer'
import { Container, Form, Button} from "react-bootstrap";
import styles from '../../../../styles/form.module.scss'
import { useEffect, useState } from "react";
import {editCategorySchema} from '../../../../utils/categorySchema'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import { getCategoryById,updateCategory } from "../../../../services/categories";

export function getServerSideProps(context) {
    return {
      props: {params: context.params}
    };
}

export default function EditCategory({params}){

    const {id} = params
    const [load, setLoad] = useState(false)
    const [category, setCategory] = useState({})
    const [queryId, setQueryId] = useState(id)
    const [errorGetCat, setErrorGetCateg] = useState(null)
    const [errorRegister, setErrorRegister] = useState(null)
    
    useEffect(async()=>{
        try{
            let getCategory = await getCategoryById(queryId)
            setCategory(getCategory)
            setLoad(true)
        }catch(err){
            let msg = err.data.msg
            setErrorGetCateg(msg)
        }
    },[])

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(editCategorySchema),
    })

    const updateSubmit = async (categ) =>{
        if(categ.name === category.name){
            setErrorRegister("A categoria já possui esse nome.")
        }
        else{
            try{
                await updateCategory(queryId, categ.name)
                window.location.href = 'http://localhost:3000/admin/categorias'
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
                    {load === true &&<Form className={styles.form} onSubmit={handleSubmit(updateSubmit)}>
                        <h1>Editar categoria</h1>
                        <Form.Group className="mt-3" controlId="formBasicName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome da categoria" defaultValue={category.name} {...register("name")}/>  
                        </Form.Group>
                        {errors.name?.message ? <Form.Text className="text-danger">{errors.name?.message}</Form.Text> : null}

                        {errorRegister ? <Form.Text className="text-danger">
                            {errorRegister}
                        </Form.Text> : null}
                        {errorGetCat ? <Form.Text className="text-danger">
                            {errorGetCat}
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