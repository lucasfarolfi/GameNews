import styles from '../../styles/newsPage.module.scss'
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Container } from "react-bootstrap";
import { getNewsBySlug } from '../../services/news';
import { getDate } from '../../utils/date';

export async function getServerSideProps(context) {
    try{
        const slug = context.params.slug
        const news = await getNewsBySlug(slug)
        
        return {
            props: {news, slug}
        };
    } catch(e){
        return {
            props: {error: "Não foi possível carregar as informações do servidor"}
        };
    }
}

export default function Home({news, slug, error}){
    
    return(
        <>
            <Header/>
            <Container className={styles.container}>
                {!error && <main className={styles.main}>
                    <section className={styles.banner}><img src={news.image} alt={news.slug} /></section>

                    <section className={styles.newsContainer}>
                        <section className={styles.newsHeader}>
                            <h1>{news.title}</h1>
                            <small>Por {news.user_name}, dia {getDate(news.created_at)} - {news.category_name}</small>
                        </section>
                        <article className={styles.newsBody}>{news.body}</article>
                    </section>
                </main>}

                {error && <main className={styles.main}>
                    <h1 className='mt-4'>Erro:</h1>
                    <p>{error}</p>
                </main>}
            </Container>
            <Footer/>
        </>
    )
}