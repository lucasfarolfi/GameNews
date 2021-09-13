import styles from '../styles/Home.module.scss'
import Header from "../components/header";
import Footer from "../components/footer";
import { Container, Button} from "react-bootstrap";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { getNews } from '../services/news';
import { getDate } from '../utils/date';

export default function Home(){

    const [lastNews, setLastNews] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(async ()=>{
        try{
            let news = await getNews()
            setLastNews(news)
            setLoad(true)
        }catch(error){
            console.log(error)
        }
    },[])

    return(
        <>
            <Header/>
            <Container>
                <main>
                    <div className={styles.carousel}></div>

                    <section className={styles.lastNews}>
                        <h2>Últimas notícias</h2>

                        <section className={styles.lastNewsContainer}>
                            {load && lastNews.map((nw, index)=>{
                                return(
                                    <Link href="/noticia/[slug]" as={`/noticia/${nw.slug}`}><div key={index} className={styles.newsBox}>
                                        <div></div>
                                        <section>
                                        <div>{nw.title}</div>
                                            <section className={styles.newsDetails}>
                                                <div>Por {nw.author}, dia {getDate(nw.created_at)}</div>
                                            </section>
                                        </section>
                                    </div></Link>
                                )
                            })}
                        </section>
                    </section>
                    
                </main>
            </Container>
            <Footer/>
        </>
    )
}