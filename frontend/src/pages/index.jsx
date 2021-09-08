import styles from '../styles/Home.module.scss'
import Header from "../components/header";
import Footer from "../components/footer";
import { Container, Button} from "react-bootstrap";
import Link from 'next/link'

export default function Home(){
    return(
        <>
            <Header/>
            <Container>
                <main>
                    <h1>Home</h1>

                    
                    
                </main>
            </Container>
            <Footer/>
        </>
    )
}