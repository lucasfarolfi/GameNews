import styles from '../../styles/lists.module.scss'
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Container } from "react-bootstrap";
import { getCategories } from '../../services/categories';
import CategoryLine from '../../components/categoryLine';
import Pagination from '../../components/pagination';

export async function getServerSideProps(context) {
    try{
        const categories = await getCategories(1, 15)
        
        return {
            props: {categories, currentPage: 1}
        };
    } catch(e){
        return {
            props: {error: "Não foi possível carregar as informações do servidor"}
        };
    }
}

export default function Categories({categories, currentPage,error}){
    
    return(
        <>
            <Header/>
            
            {!error &&
                <main className={styles.main}>
                    <Container className={styles.container}>
                        <h2>Categorias</h2>
                        <section>
                            {!error && categories?.result?.map((cat, index)=>{
                                return <CategoryLine props={cat} key={cat.slug}/>
                            })}
                        </section>

                        <section>
                            <Pagination currentPage={currentPage} total={categories.total_pages} url={"/pagina/"}/>
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