import styles from '../../styles/newsPage.module.scss'
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Container, Button} from "react-bootstrap";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { getNewsBySlug } from '../../services/news';
import { getDate } from '../../utils/date';

export function getServerSideProps(context) {
    return {
      props: {params: context.params}
    };
}

export default function Home({params}){
    const [load, setLoad] = useState(false)
    const [querySlug, setQuerySlug] = useState(params.slug)
    const [news, setNews] = useState([])
    
    useEffect(async ()=>{
        try{
            let getNews = await getNewsBySlug(querySlug)
            setNews(getNews)
            setLoad(true)
        }catch(error){
            console.log(error)
        }
    },[])

    return(
        <>
            <Header/>
            <Container>
                {load && <main className={styles.main}>
                    <section className={styles.banner}></section>

                    <section className={styles.newsContainer}>
                        <section className={styles.newsHeader}>
                            <h1>{news.title}</h1>
                            <div>Por {news.author}, dia {getDate(news.created_at)}</div>
                        </section>
                        <article className={styles.newsBody}>{news.body}</article>
                    </section>
                </main>}
            </Container>
            <Footer/>
        </>
    )
}