import Header from "../../../components/header";
import Footer from "../../../components/footer"
import { Container, Button } from "react-bootstrap";
import Link from 'next/link'
import { deleteNews, getNews } from "../../../services/news";
import { getDate } from "../../../utils/date";
import styles from '../../../styles/tables.module.scss'

export async function getServerSideProps(context) {
    try{
        const news = await getNews("", "1", "15")
        
        return {
            props: { news }
        };
    } catch(e){
        return {
            props: {error: "Não foi possível carregar as notícias no servidor"}
        };
    }
}

export default function Noticias({news, error}){

    return(
        <>
            <Header/>
            <Container className={styles.container}>
                {!error && 
                <main>
                    <h1>Notícias</h1>

                    <Link href="/admin/noticia/novo" passHref><Button variant="outline-primary">Cadastrar</Button></Link>
                    <div className="table-responsive-sm">
                    <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Título</th>
                                <th scope="col">Slug</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Autor</th>
                                <th scope="col">Criação</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!error && news?.result?.map((news)=>{
                                return(
                                    <tr key={news.id}>
                                    <td scope="col">{news.id}</td>
                                    <td scope="col">{news.title}</td>
                                    <td scope="col">{news.slug}</td>
                                    <td scope="col">{news.category_name}</td>
                                    <td scope="col">{news.user_name}</td>
                                    <td scope="col">{getDate(news.created_at)}</td>
                                    <td scope="col"><Link href="/admin/noticia/editar/[id]" as={`/admin/noticia/editar/${news.id}`}><Button className="m-1" variant="warning">Editar</Button></Link>
                                    <Button 
                                    variant="danger"
                                    onClick={ async () => {
                                        let confirmation = confirm("Você deseja mesmo excluir essa noticia ?")
                                        if(confirmation){
                                            await deleteNews(news.id)
                                            window.location.href = "http://localhost:3000/admin/noticias"
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

                {error && <main className={styles.main}>
                    <h1 className='mt-4'>Erro:</h1>
                    <p>{error}</p>
                </main>}
            </Container>
            <Footer/>
        </>
    )
}