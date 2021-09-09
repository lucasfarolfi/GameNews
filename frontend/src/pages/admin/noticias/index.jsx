import Header from "../../../components/header";
import Footer from "../../../components/footer"
import { Container, Button} from "react-bootstrap";
import Link from 'next/link'
export default function Noticias(){
    return(
        <>
            <Header/>
            <Container>
                <main>
                    <h1>Notícias</h1>

                    <Link href="/admin/noticias/novo" passHref><Button className="success">Cadastrar</Button></Link>
                    
                </main>
            </Container>
            <Footer/>
        </>
    )
}