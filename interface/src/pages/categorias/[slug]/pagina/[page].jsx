import styles from '../../../../styles/lists.module.scss'
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import { Container } from "react-bootstrap";
import { getCategoryBySlug } from '../../../../services/categories';
import Pagination from '../../../../components/pagination';
import { getNews } from '../../../../services/news';
import NewsBox from '../../../../components/newsBox';

export async function getServerSideProps(context) {
    try{
        const slug = context.params.slug
        const page = parseInt(context.params.page)

        const category = await getCategoryBySlug(slug)
        const newsBySlug = await getNews("true", page, 15, null, category.name)
        
        return {
            props: {newsBySlug, currentPage: page, categoryName: category.name, slug}
        };
    } catch(e){
        return {    
            props: {error: "Não foi possível carregar as informações do servidor"}
        };
    }
}

export default function CategoryNews({newsBySlug, currentPage, error, categoryName, slug}){
    
    return(
        <>
            <Header/>
            
            {!error &&
                <main className={styles.main}>
                    <Container className={styles.container}>
                        <h2>Categoria: {categoryName ? categoryName : ""}</h2>
                        <section>
                            {!error && newsBySlug?.result?.map((nws, index)=>{
                                return <NewsBox {...nws} key={nws.slug} />
                            })}

                            {newsBySlug.total_pages < currentPage && <p>Nenhum registro encontrado na página atual</p>}
                        </section>

                        <section>
                            <Pagination currentPage={currentPage} total={newsBySlug.total_pages} url={"/categoria/"+slug+"/pagina/"}/>
                        </section>
                    </Container>
                </main>
            }
                
            {error &&
                <main className={styles.main}>
                    <Container className={styles.container}>
                        <h1 className='mt-4'>Erro:</h1>
                        <p>{error}</p> 
                    </Container>
                </main>
            }
            
            <Footer/>
        </>
    )
}