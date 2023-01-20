import { useSelector, useDispatch } from "react-redux";

import { currentPage } from "../../features/email/emailSlice";

import styles from "./PageButtons.module.css";

const PageButtons = () => {
    const total = useSelector(state => state.email.total)
    const page = useSelector(state => state.email.page)
    
    const dispatch = useDispatch()
    
    const handlePageClick = (selectedPage) => {
        dispatch(currentPage({page: selectedPage}))
    }

    return(
        <>
        {
         total
         ?
         <div className={styles['page-buttons']}>
             {page > 1 && <button onClick={() => handlePageClick(page - 1)} className={styles['page-direction-buttons']}>◀</button>}
            {
                [...Array(Math.ceil(total / 10)).keys()].map((_,idx) => (
                   <button key={idx} className={`${styles['page-numbered-buttons']} ${page === idx+1 && styles['selected']}`} data-selected={idx+1 === page} onClick={() => handlePageClick(idx+1)}>{idx + 1}</button>
                ))
            }
            {page < Math.ceil(total / 10) && <button onClick={() => handlePageClick(page + 1)} className={styles['page-direction-buttons']}>▶</button>}
         </div>
         :
         null   
        }
        </>
    )
}

export default PageButtons;