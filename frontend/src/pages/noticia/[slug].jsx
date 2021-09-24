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
            <Container className={styles.container}>
                {load && <main className={styles.main}>
                    <section className={styles.banner}><img src="https://c4.wallpaperflare.com/wallpaper/975/113/92/spider-man-spider-man-ps4-marvel-comics-video-game-wallpaper-preview.jpg" alt="" /></section>

                    <section className={styles.newsContainer}>
                        <section className={styles.newsHeader}>
                            <h1>{news.title}</h1>
                            <small>Por {"news.author"}, dia {getDate(news.created_at)} - {"news.category"}</small>
                        </section>
                        <article className={styles.newsBody}>{news.body}</article>
                    </section>
                </main>}
            </Container>
            <Footer/>
        </>
    )
}