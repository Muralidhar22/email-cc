import { useSelector, useDispatch } from "react-redux";

import { updatedFilter } from "../../features/filterSlice";
import styles from "./FilterEmail.module.css"

const FilterEmail = () => {
    const selectedFilter = useSelector(state => state.filter.selected)
    const dispatch = useDispatch()
    
    const handleFilter = (filter) => {
        dispatch(updatedFilter(filter))
    }
    
    return(
        <div className={styles['filter-container']}>
            <span>Filter By:</span>
            <button className={`${styles['filter-button']} 
            ${selectedFilter.read === false && styles['selected']}`} role="option" onClick={() => handleFilter({ read: false })}>Unread</button>
            <button className={`${styles['filter-button']} 
            ${selectedFilter.read && styles['selected']}`} role="option" onClick={() => handleFilter({ read: true })}>Read</button>
            <button className={`${styles['filter-button']} 
            ${selectedFilter.favorite && styles['selected']}`}  role="option" onClick={() => handleFilter({ favorite: true })}>Favorite</button>
        </div>
    )
}

export default FilterEmail;