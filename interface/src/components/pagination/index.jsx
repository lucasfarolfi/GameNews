import { Pagination } from "react-bootstrap"
import styles from "./pagination.module.scss"

export default function PaginationComponent({currentPage, total, url}){
    const currentUrl = `${url}${currentPage}`

    const totalPageIteration = () => {
        let arr = []
        for(let i=1; i <= total; i++){
            arr.push(i)
        }

        return arr;
    }

    return (
        <Pagination className={styles.pagination}>
            <Pagination.First href={currentPage > 1 ? `${url}${1}` : null}>1</Pagination.First>
            <Pagination.Prev href={(currentPage-1) >= 1 ? `${url}${currentPage-1}` : null} />

            { total >= 7 && (currentPage && total) && <>
                    <Pagination.Ellipsis />
                    { (currentPage-3 >= 1) && <Pagination.Item href={`${url}${currentPage-3}`} >{currentPage-3}</Pagination.Item> }
                    { (currentPage-2 >= 1) && <Pagination.Item href={`${url}${currentPage-2}`} >{currentPage-2}</Pagination.Item> }
                    { (currentPage-1 >= 1) && <Pagination.Item href={`${url}${currentPage-1}`} >{currentPage-1}</Pagination.Item> }
                    <Pagination.Item href={currentUrl} active>{currentPage}</Pagination.Item>
                    { (currentPage+1 <= total) && <Pagination.Item href={`${url}${currentPage+1}`} >{currentPage+1}</Pagination.Item> }
                    { (currentPage+2 <= total) && <Pagination.Item href={`${url}${currentPage+2}`} >{currentPage+2}</Pagination.Item> }
                    { (currentPage+3 <= total) && <Pagination.Item href={`${url}${currentPage+3}`} >{currentPage+3}</Pagination.Item> }
                    <Pagination.Ellipsis />
                </>
            }

            {
                total <= 7 && (currentPage && total) && totalPageIteration()?.map(i => {
                    const constUrl = `${url}${i}`
            
                    if(currentPage === i) return <> <Pagination.Item href={constUrl} active>{i}</Pagination.Item> </>
            
                    return <> <Pagination.Item href={constUrl}>{i}</Pagination.Item> </>
                    
                })
            }

            <Pagination.Next href={(currentPage+1) <= total ? `${url}${currentPage+1}` : null}/>
            <Pagination.Last href={currentPage < total ? `${url}${total}` : null}>{total}</Pagination.Last>
        </Pagination>
    )
}