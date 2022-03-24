
import styles from './searchBarNav.module.scss'
import SearchIcon from './searchIcon'
import { useState } from 'react'

export default function SearchBarNav(){

    const [search, setSearch] = useState('')

    const handleChange = (evt)=>{
        setSearch(evt.target.value)
    }

    const handleSubmit = (evt)=>{
        evt.preventDefault()

        if(search === ''){
            return
        }
        else{
            window.location.href = 'http://localhost:3000/pesquisa/'+search.toLowerCase().replace(/[^\w-]+/g,'')
        }
        
    }
    return(
        <form className={styles.searchContainer} onSubmit={handleSubmit}>
            <input type="search" placeholder="Pesquise uma notícia" onChange={handleChange} value={search}/>
            <button type="submit" className={styles.searchBtn}><SearchIcon/></button>
        </form>
    )
}