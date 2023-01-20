import { useSelector } from "react-redux";

import { getFormattedDateTime } from "../../../utils/dateTime";

import styles from "./EmailItem.module.css"

const EmailItem = ({ 
                    details,
                    handleEmailClick,
                    selectedEmailId,
                    filterKey }) => {
    const formattedTimeStamp = getFormattedDateTime(details.date)
    const emailState = useSelector(state => state.email.list.find(item => item.id === details.id ))
    
    if(
        filterKey === 'favorite'
        &&
        !emailState[filterKey]
    ) {
       return null; 
    }

    return(
            <li className={`${styles['email-item']} cursor-pointer ${selectedEmailId === details.id && styles['selected']} ${
                emailState 
                &&
                emailState.read
                && styles['read']}`} onClick={() => handleEmailClick(details.id)}>
                <span className={styles['email-item-avatar']}>
                    {details.from.name.charAt(0)}
                </span>
                <div className={styles['']}>
                    <div className={styles['email-item-content-row']}>
                        <span className={styles['email-item-content-type']}>
                        From:&nbsp;</span>
                        <span className={styles['email-item-content']}>
                            {details.from.name}&nbsp;
                        </span>
                        <span className={styles['email-item-content']}>
                            &lt;{details.from.email}&gt;
                        </span>
                    </div>
                    <div className={styles['email-item-content-row']}>
                        <span className={styles['email-item-content-type']}>
                            Subject:&nbsp;</span>
                            <span className={styles['email-item-content']}>{details.subject}</span>
                             <b>id:{details.id}</b>
                    </div>
                    <div className={`${styles['email-item-sd']} ${
                        selectedEmailId && styles['selected']}`}>
                        {details.short_description}
                    </div>
                    <div className={styles['email-item-content-row']}>
                        <span className={styles['time-stamp']}>
                        {formattedTimeStamp}    
                        </span>
                        {emailState.favorite && <span className={styles['favorite-text']}>Favorite</span>}
                    </div>
                </div>
            </li>
    )
}

export default EmailItem;