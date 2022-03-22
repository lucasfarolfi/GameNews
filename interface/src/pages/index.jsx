import styles from '../styles/Home.module.scss'
import Header from "../components/header";
import Footer from "../components/footer";
import { Container } from "react-bootstrap";
import { getNews } from '../services/news';
import NewsBox from '../components/newsBox';
import Highlighted from '../components/highlightedNews/highlightedNews';
import Pagination from '../components/pagination';

export async function getServerSideProps(context) {
    try{
        const highlightedNews = await getNews("true", "1", "4")
        const lastNews = await getNews("true", "1", "10")
        
        return {
            props: {highlightedNews, lastNews, currentPage: 1}
        };
    } catch(e){
        return {
            props: {error: "Não foi possível carregar as informações do servidor"}
        };
    }
}

export default function Home({highlightedNews, lastNews, error, currentPage}){
    
    return(
        <>
            <Header/>
                {!error &&
                    <main className={styles.main}>
                        <section className={styles.highlightsContainer}>
                            <Container className={styles.container}>
                                <h2>Em destaque</h2>
                                <section className={styles.highlights}>
                                    
                                    {!error && highlightedNews?.result?.map((nw, index)=>{
                                        if(index >= 0 && index <= 3){
                                            return(
                                                <Highlighted {...nw}/>
                                            )
                                        }
                                        else{
                                        return;
                                        }
                                    })}
                                </section>
                            </Container>
                        </section>
                        

                        <Container className={styles.container}>
                            <section className={styles.lastNews}>
                                <h2>Últimas notícias</h2>

                                <section className={styles.lastNewsContainer}>
                                    {!error && lastNews?.result?.map((nw, index)=>{
                                        return(
                                            <NewsBox {...nw}/>
                                        )
                                    })}
                                </section>

                                <Pagination currentPage={currentPage} total={lastNews.total_pages} url={"/pagina/"}/>
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