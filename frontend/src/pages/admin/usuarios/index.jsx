import Header from "../../../components/header";
import Footer from "../../../components/footer"
import { Container, Button} from "react-bootstrap";
import Link from 'next/link'
import Router from 'next/router';
import { useEffect, useState } from "react";
import {getUsers, deleteUser} from '../../../services/users'

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
            <Container>
                <main>
                    <h1>Usuários</h1>

                    <Link href="/cadastro" passHref><Button variant="outline-primary">Cadastrar</Button></Link>
                        <div className="table-responsive-sm">
                        <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">nome</th>
                                <th scope="col">slug</th>
                                <th scope="col">email</th>
                                <th scope="col">cargo</th>
                                <th scope="col">ações</th>
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