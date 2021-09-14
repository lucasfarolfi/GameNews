import styles from '../styles/Home.module.scss'
import Header from "../components/header";
import Footer from "../components/footer";
import { Container, Button} from "react-bootstrap";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { getNews } from '../services/news';
import { getDate } from '../utils/date';
import NewsBox from '../components/newsBox';
import Highlighted from '../components/highlightedNews/highlightedNews';

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
                <main className={styles.main}>
                    <section className={styles.highlightsContainer}>
                        <Container className={styles.container}>
                            <h2>Em destaque</h2>
                            <section className={styles.highlights}>
                                
                                {load && lastNews.map((nw, index)=>{
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
                    

                    <Container className={styles.container}><section className={styles.lastNews}>
                        <h2>Últimas notícias</h2>

                        <section className={styles.lastNewsContainer}>
                            {load && lastNews.map((nw, index)=>{
                                return(
                                    <NewsBox {...nw}/>
                                )
                            })}
                        </section>
                    </section></Container>
                    
                </main>
            
            <Footer/>
        </>
    )
}