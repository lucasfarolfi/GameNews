import styles from '../../styles/Home.module.scss'
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Container } from "react-bootstrap";
import { getCategories } from '../../services/categories';

export async function getServerSideProps(context) {
    try{
        const categories = await getCategories("1", "4")
        
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
            
            {!error &&
                <main className={styles.main}>
                <Container className={styles.container}>
                    <h2>Categorias</h2>
                    <section>
                        {!error && categories?.result?.map((cat, index)=>{
                            return(
                                <h1 key={cat.id}>Olá mundo</h1>
                            )
                        })}
                    </section>
                </Container>
                </main>
            }
                
            {error &&
                <main className={styles.main}>
                    <h1 className='mt-4'>Erro:</h1>
                    <p>{error}</p> 
                </main>
            }
            
            <Footer/>
        </>
    )
}