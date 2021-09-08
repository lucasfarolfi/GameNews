import Link from 'next/link'
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap'

export default function Header(){
    return(
        <header>
            <Navbar variant="dark" bg="danger" expand="lg">
                <Container >
                    <Link href="/" passHref><Navbar.Brand>GameNews</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="d-lg-flex justify-content-lg-end " >
                    
                        <Form className="d-flex my-lg-0 my-sm-2 mx-lg-2">
                            <FormControl
                                type="search"
                                placeholder="Pesquise uma notícia"
                                className="mr-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-light">Pesquisar</Button>
                        </Form>
                        
                        <Nav
                        className="mr-auto my-2 my-lg-0"
                        navbarScroll
                        >
                        <Link href="/" passHref><Nav.Link>Home</Nav.Link></Link>
                            <Link href="/" passHref><Nav.Link>Notícias</Nav.Link></Link>
                            <Link href="/" passHref><Nav.Link>Categorias</Nav.Link></Link>
                            <Link href="/login" passHref><Nav.Link>Login</Nav.Link></Link>
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