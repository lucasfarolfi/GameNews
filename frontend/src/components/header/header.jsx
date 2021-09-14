import Link from 'next/link'
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap'
import styles from './header.module.scss'
import SearchBarNav from '../SearchBarNav'

export default function Header(){
    return(
        <header>
            <Navbar variant="dark" bg="danger" expand="lg">
                <Container className={styles.container}>
                    <Link href="/" passHref><Navbar.Brand>GameNews</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="d-lg-flex justify-content-lg-end " >
                    
                    <SearchBarNav/>
                        
                        <Nav
                        className="mr-auto my-2 my-lg-0"
                        navbarScroll
                        >
                            <Link href="/" passHref><Nav.Link>Categorias</Nav.Link></Link>
                            <Link href="/login" passHref><Nav.Link>Entrar</Nav.Link></Link>
                            <Link href="/cadastro" passHref><Nav.Link>Cadastrar-se</Nav.Link></Link>
                            <NavDropdown title="Admin" id="navbarScrollingDropdown">
                                <Link href="/admin/noticias" passHref><NavDropdown.Item>Notícias</NavDropdown.Item></Link>
                                <Link href="/admin/categorias" passHref><NavDropdown.Item>Categorias</NavDropdown.Item></Link>
                                <Link href="/admin/usuarios" passHref><NavDropdown.Item>Usuários</NavDropdown.Item></Link>
                            </NavDropdown>
                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            
            </Navbar>
        </header>
        
    )
}