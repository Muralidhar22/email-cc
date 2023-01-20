import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchEmailBody } from "../emailBodySlice";
import { updateFavorite, updateRead } from "../emailSlice";
import { updatePersistedEmailList, setPersistedEmailStatus } from "../../../utils/persistEmailState";
import { getFormattedDateTime } from "../../../utils/dateTime";

import styles from "./EmailBody.module.css";

const EmailBody = ({ selectedEmailId, filterKey }) => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.email.page)
    const { id, from, subject, date } = useSelector(state => state.email.filteredList.find(item => item.id === selectedEmailId))
    const emailState = useSelector(state => state.email.list.find(item => item.id === id))
    const { data, loading, error } =  useSelector(state => state.emailBody)
    const para = []
    const renderedBodyContent = data 
                                &&
                                new DOMParser().parseFromString(data,"text/html").getElementsByTagName("div");
    if(renderedBodyContent){
        Array.from(renderedBodyContent).forEach((el) => {
            el.childNodes.forEach(ele => {
                para.push(ele)
            })
        })
    }
    const formattedTimeStamp = date && getFormattedDateTime(date)

    useEffect(() => {
            dispatch(fetchEmailBody(selectedEmailId))
            dispatch(updateRead({ emailId: id, read: true }))
            updatePersistedEmailList(id, 'read', true, page)
            setPersistedEmailStatus(id, 'read')
    },[selectedEmailId])
    
    if(
        filterKey === 'favorite'
        &&
        !emailState[filterKey]
    ) {
       return null; 
    }
    
    const toggleFavorite = (value) => {
        updatePersistedEmailList(id, 'favorite', value, page)
        setPersistedEmailStatus(id, 'favorite')
        dispatch(updateFavorite({ emailId: id, favorite: value }))
    }

    return(
        <section className={styles['email-body']}>
            {loading && <h1>Loading...</h1>}
            { (!loading && !error && data) && (
                <>
                <span
                    className={styles['avatar']}>
                        {from.name.charAt(0)}
                </span>
                <div className={styles['email-body-content']}>
                    <div className={styles['email-body-header']}>
                        <h2 className={styles['email-body-subject']}>{subject}</h2>
                        {emailState.favorite 
                        ?
                        <button onClick={() => toggleFavorite(false)} className={styles['inverted-favorite-btn']}>Unmark favorite</button>
                        :
                        <button onClick={() => toggleFavorite(true)} className={styles['favorite-btn']}>Mark as favorite</button>
                        }
                    </div>
                    <span className={styles['time-stamp']}>{formattedTimeStamp}</span>
                    <div className={styles['email-body-text']}>
                    {para.map((el, idx) => (
                        <p key={idx} className={styles['email-body-para']}>
                            {el.innerText}
                        </p>
                    ))}
                    </div>
                </div>
                </>
                )}
            {error && <div>{error}</div>}
        </section>
    )
}

export default EmailBody;