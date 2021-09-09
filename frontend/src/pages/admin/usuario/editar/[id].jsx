import Header from "../../../../components/header";
import Footer from '../../../../components/footer'
import { Container, Form, Button} from "react-bootstrap";
import styles from '../../../../styles/form.module.scss'
import { useEffect, useState } from "react";
import {getUserById} from '../../../../services/users'

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
    

    useEffect(async()=>{
        try{
            let getUser = await getUserById(queryId)
            setUser(getUser)
            setLoad(true)
        }catch(err){
            console.log(err)
        }
    },[])

    return(
        <>
            <Header/>
            <Container>
                <main>
                    {load === true &&<Form className={styles.form}>
                        <h1>Editar usuario</h1>
                        <Form.Group className="mb-3" controlId="formBasicFirstname">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome completo" defaultValue={user.name}/>  
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Digite o email" defaultValue={user.email} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicRole">
                            <Form.Label>Cargo</Form.Label>
                            <Form.Select defaultValue={user.role}>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                            </Form.Select>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Digite uma senha nova (opcional)"/>
                            <Form.Text className="text-muted">
                            Obs: Se não quiser alterar a senha, deixe o campo vazio.
                            </Form.Text>
                        </Form.Group>

                        <div className="d-grid gap-2 mt-4">
                            <Button variant="danger" size="lg">
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