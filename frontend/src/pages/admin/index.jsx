import Header from "./../../components/header";
import Footer from "./../../components/footer"
import { Container, Button} from "react-bootstrap";
import Link from 'next/link'
export default function Categorias(){
    return(
        <>
            <Header/>
            <Container>
                <main>
                    <h1>Admin</h1>

                    <Link href="/admin/categorias" passHref><Button className="success">Categorias</Button></Link>
                    <Link href="/admin/noticias" passHref><Button className="success">Noticias</Button></Link>
                    <Link href="/admin/usuarios" passHref><Button className="success">Usuários</Button></Link>
                    
                </main>
            </Container>
            <Footer/>
        </>
    )
}