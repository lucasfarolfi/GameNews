import Header from "../../../components/header";
import Footer from "../../../components/footer"
import { Container, Form, Button} from "react-bootstrap";
import styles from '../../../styles/form.module.scss'

export default function Novo(){
    return(
        <>
            <Header/>
            <Container>
                <main>
                    
                    <Form className={styles.form}>
                        <h1>Cadastre sua notícia</h1>   

                        <Form.Group className="mb-3" controlId="formBasicTitlel">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" placeholder="Digite o título da notícia" />
                        
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicBody">
                            <Form.Label>Corpo</Form.Label>
                            <Form.Control type="text" placeholder="Digite o corpo da notícia" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicAuthor">
                            <Form.Label>Autor</Form.Label>
                            <Form.Control type="text" placeholder="Digite o Autor" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control type="text" placeholder="Digite a Categoria" />
                        </Form.Group>

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