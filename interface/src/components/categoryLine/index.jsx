import Link from 'next/link'
import styles from './categoryLine.module.scss'

export default function CategoryLine({props}){
    return(
        <Link href="/categorias/[slug]" as={`/categorias/${props.slug}`}>
            <div key={props.id} className={styles.category}>
                <p>{props.name}</p>
            </div>
        </Link>
    )
}