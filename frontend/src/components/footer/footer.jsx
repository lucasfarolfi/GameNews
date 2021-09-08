import { Container, Button} from "react-bootstrap";
import Link from 'next/link'
import styles from './footer.module.scss'

export default function Footer(){
    return(

        <footer className={styles.footer}>
            <Container>
            <h1>Rodapé</h1>
                    
            </Container>
        </footer>

    )
}