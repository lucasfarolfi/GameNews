import Header from "../../../components/header";
import Footer from "../../../components/footer"
import { Container, Button} from "react-bootstrap";
import Link from 'next/link'
import Router from 'next/router';
import { useEffect, useState } from "react";
import {getUsers, deleteUser} from '../../../services/users'
import { getDate } from "../../../utils/date";
import styles from '../../../styles/tables.module.scss'

export default function Usuarios(){

    const [users, setUsers] = useState([])
    const [loadTable, setLoadTable] = useState(false)

    useEffect(async ()=>{
        try{
            let users = await getUsers()
            setUsers(users)
            if(users.length > 0) setLoadTable(true)
        }catch(err){
            console.log(err)
        }
        
    } ,[])

    return(
        <>
            <Header/>
            <Container className={styles.container}>
                <main>
                    <h1>Usuários</h1>

                    <Link href="/cadastro" passHref><Button variant="outline-primary">Cadastrar</Button></Link>
                        <div className="table-responsive-sm">
                        <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Slug</th>
                                <th scope="col">Email</th>
                                <th scope="col">Cargo</th>
                                <th scope="col">Criação</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadTable && users.map((user)=>{
                                return(
                                    <tr key={user.id}>
                                    <td scope="col">{user.id}</td>
                                    <td scope="col">{user.name}</td>
                                    <td scope="col">{user.slug}</td>
                                    <td scope="col">{user.email}</td>
                                    <td scope="col">{user.role}</td>
                                    <td scope="col">{getDate(user.created_at)}</td>
                                    <td scope="col"><Link href="/admin/usuario/editar/[id]" as={`/admin/usuario/editar/${user.id}`}><Button className="m-1" variant="warning">Editar</Button></Link>
                                    <Button 
                                    variant="danger"
                                    onClick={ async () => {
                                        let confirmation = confirm("Você deseja mesmo excluir esse usuário ?")
                                        if(confirmation){
                                            await deleteUser(user.id)
                                            window.location.href = "http://localhost:3000/admin/usuarios"
                                        }
                                    
                                    }} 
                                    >Excluir</Button></td>
                                    </tr>
                                )
                                
                            })}
                        </tbody>
                    </table>
                        </div>
                    
                    
                </main>
            </Container>
            <Footer/>
        </>
    )
}