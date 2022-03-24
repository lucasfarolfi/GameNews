import styles from '../../styles/lists.module.scss'
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Container } from "react-bootstrap";
import { getCategories } from '../../services/categories';
import { getNews } from '../../services/news';
import NewsBox from '../../components/newsBox';
import CategoryLine from '../../components/categoryLine';
import Link from 'next/link';

export async function getServerSideProps(context) {
    try{
        const search = context.params.search.split("-").join(" ")
        
        const categories = await getCategories(1, 10, search)
        const news = await getNews("true", 1, 10, search)
        
        return {
            props: {news, categories, search}
        };
    } catch(e){
        return {    
            props: {error: "Não foi possível carregar as informações do servidor"}
        };
    }
}

export default function Search({news, categories, search, error}){
  
    return(
        <>
            <Header/>
            
            {!error &&
                <main className={styles.main}>
                    <Container className={styles.container}>
                        <h2>Pesquisa: {search ? search : ""}</h2>

                        <section className={styles.searchSection}>
                            <h3>Notícias</h3>

                            <section>
                                {!error && news?.result?.map((nws, index)=>{
                                    return <NewsBox {...nws} key={nws.slug} />
                                })}

                            </section>
                            {news.total > 10 && <div className={styles.seeMoreBtn}><Link href="#">Ver mais</Link></div>}
                            {news.total_pages < 1 && <p>Nenhuma notícia encontrada</p>}
                        </section>

                        <section className={styles.searchSection}>
                            <h3>Categorias</h3>

                            <section>
                                {!error && categories?.result?.map((cat, index)=>{
                                    return <CategoryLine props={cat} key={cat.slug} />
                                })}

                            </section>
                            {categories.total > 10 && <div className={styles.seeMoreBtn}><Link href="#">Ver mais</Link></div>}
                            {categories.total_pages < 1 && <p>Nenhuma categoria encontrada</p>}
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