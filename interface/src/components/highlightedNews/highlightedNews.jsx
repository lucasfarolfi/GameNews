import Link from 'next/link'
import styles from './highlightedNews.module.scss'

export default function Highlighted(props){
    return(
        <Link href="/noticia/[slug]" as={`/noticia/${props.slug}`}>
            <div key={props.id} className={styles.HighlightedBox}>
                <img src={props.image} alt={props.name} />
                <section className={styles.newsInfo}>
                    <h3>{props.title}</h3>
                </section>
            </div>
        </Link>
    )
}