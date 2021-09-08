import Header from "../components/header";
import Footer from '../components/footer'
import { Container, Form, Button} from "react-bootstrap";
import styles from '../styles/form.module.scss'

export default function Login(){
    return(
        <>
            <Header/>
            <Container>
                <main>
                    
                    <Form className={styles.form}>
                        <h1>Faça login</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" />
                    
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha" />
                    </Form.Group>

                    <div className="d-grid gap-2 mt-4">
                        <Button variant="danger" size="lg">
                            Entrar
                        </Button>
                    </div>              
                    
                    </Form>
                </main>
            </Container>
            <Footer/>
        </>
    )
}