import Link from 'next/link'
import styles from './highlightedNews.module.scss'

export default function Highlighted(props){
    return(
        <Link href="/noticia/[slug]" as={`/noticia/${props.slug}`}>
            <div key={props.id} className={styles.HighlightedBox}>
                <img src="https://c4.wallpaperflare.com/wallpaper/975/113/92/spider-man-spider-man-ps4-marvel-comics-video-game-wallpaper-preview.jpg" alt={props.name} />
                <section className={styles.newsInfo}>
                    <h3>{props.title}</h3>
                </section>
            </div>
        </Link>
    )
}