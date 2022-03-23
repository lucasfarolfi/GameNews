import styles from '../../styles/Home.module.scss'
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Container } from "react-bootstrap";
import { getCategories } from '../../services/categories';

export async function getServerSideProps(context) {
    try{
        const categories = await getCategories(1, 15)
        
        return {
            props: {categories}
        };
    } catch(e){
        return {
            props: {error: "Não foi possível carregar as informações do servidor"}
        };
    }
}

export default function Home({categories, error}){
    
    return(
        <>
            <Header/>
            <Container className={styles.container}>
                {!error &&
                    <main className={styles.main}>
                    
                        <h2>Categorias</h2>
                        <section>
                            {!error && categories?.result?.map((cat, index)=>{
                                return(
                                    <h1 key={cat.id}>Olá mundo</h1>
                                )
                            })}
                        </section>
                    </main>
                }
                    
                {error &&
                    <main className={styles.main}>
                        <h1 className='mt-4'>Erro:</h1>
                        <p>{error}</p> 
                    </main>
                }
            </Container>
            <Footer/>
        </>
    )
}