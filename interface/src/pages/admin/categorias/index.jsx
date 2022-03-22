import Header from "../../../components/header";
import Footer from "../../../components/footer"
import { Container, Button} from "react-bootstrap";
import Link from 'next/link'
import { getCategories, deleteCategory } from "../../../services/categories";
import { getDate } from "../../../utils/date";
import styles from '../../../styles/tables.module.scss'

export async function getServerSideProps(context) {
    try{
        const categories = await getCategories("1", "15")
        
        return {
            props: { categories }
        };
    } catch(e){
        return {
            props: {error: "Não foi possível carregar as notícias no servidor"}
        };
    }
}

export default function Categorias({categories, error}){

    return(
        <>
            <Header/>
            <Container className={styles.container}>
                { !error && <main>
                    <h1>Categorias</h1>

                    <Link href="/admin/categoria/novo" passHref><Button variant="outline-primary">Cadastrar</Button></Link>
                    <div className="table-responsive-sm">
                        
                            <table className="table table-striped mt-5">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Slug</th>
                                        <th scope="col">Autor(a)</th>
                                        <th scope="col">Criação</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { categories && categories.result?.map((category)=>{
                                        return(
                                            <tr key={category.id}>
                                            <td scope="col">{category.id}</td>
                                            <td scope="col">{category.name}</td>
                                            <td scope="col">{category.slug}</td>
                                            <td scope="col">{category.user_name}</td>
                                            <td scope="col">{getDate(category.created_at)}</td>
                                            <td scope="col"><Link href="/admin/categoria/editar/[id]" as={`/admin/categoria/editar/${category.id}`}><Button className="m-1" variant="warning">Editar</Button></Link>
                                            <Button 
                                            variant="danger"
                                            onClick={ async () => {
                                                let confirmation = confirm("Você deseja mesmo excluir essa categoria ?")
                                                if(confirmation){
                                                    await deleteCategory(category.id)
                                                    window.location.href = "http://localhost:3000/admin/categorias"
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
                }

                {error && 
                    <main className={styles.main}>
                        <h1 className='mt-4'>Erro:</h1>
                        <p>{error}</p>
                    </main>
                }
            </Container>
            <Footer/>
        </>
    )
}