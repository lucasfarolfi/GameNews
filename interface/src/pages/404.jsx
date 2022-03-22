import styles from "../styles/Home.module.scss"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import { Container } from "react-bootstrap"

export default function NotFound(){
    return <>
        <Header/>
        <main className={styles.main}>
            <Container className={styles.container}>
                <h1 className='mt-4'>Erro 404: Página não encontrada</h1>
            </Container>
        </main> 
        
        <Footer/>
    </>
}