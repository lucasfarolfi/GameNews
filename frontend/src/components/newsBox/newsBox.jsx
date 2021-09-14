import Link from 'next/link'
import styles from './newsBox.module.scss'
import { getDate } from '../../utils/date'

export default function NewsBox(props){
    return(
        <Link href="/noticia/[slug]" as={`/noticia/${props.slug}`}>
            <div key={props.id} className={styles.newsBox}>
                <img src="https://sm.ign.com/t/ign_br/screenshot/default/ps5_xkzd.280.jpg" alt={props.name} />
                <section className={styles.newsInfo}>
                    <h3>{props.title}</h3>
                    <small>Por {props.author}, {getDate(props.created_at)}</small>
                </section>
            </div>
        </Link>
    )
}