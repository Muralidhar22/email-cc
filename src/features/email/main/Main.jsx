import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import EmailItem from "../email-item/EmailItem";
import { fetchEmailList, updateList, setFilteredList } from "../emailSlice";

import styles from "./Main.module.css";
import EmailBody from "../email-body/EmailBody";

const Main = () => {
    const { loading, error, page } = useSelector(state => state.email)
    const filter = useSelector(state => state.filter.selected)
    const [splitScreen, setSplitScreen] = useState(false)
    const [selectedEmailId, setSelectedEmailId] = useState(null)
    const dispatch = useDispatch()
    const filterKey = Object.keys(filter)[0];
    const { filteredList } = useSelector(state => state.email)
    
    useEffect(() => {
        setSplitScreen(false)
        const persistedList = JSON.parse(localStorage.getItem('email-list'))
        if(!persistedList || !persistedList[page]){
            dispatch(fetchEmailList(filter))
        } else if(persistedList[page]) {
            dispatch(updateList({ list: persistedList[page], filter }))
        }
    },[dispatch, page])
    
    useEffect(() => {
        setSplitScreen(false)
        setSelectedEmailId(null)
        dispatch(setFilteredList({ filter }))
    },[filter])
    
    const handleEmailClick = (emailId) => {
        !splitScreen && setSplitScreen(true)
        setSelectedEmailId(emailId)
    }

    return(<>
    {loading && <h1>Loading...</h1>}
    {
        !loading && !error && filteredList && (
            <main className={`${splitScreen ? styles['split'] : ''}`}>
                <ul className={styles['email-list']}>
                    {
                        filteredList.map(email => (
                                <EmailItem 
                                    key={email.id+email.subject}
                                    details={email}
                                    handleEmailClick={handleEmailClick} 
                                    selectedEmailId={selectedEmailId}
                                    filterKey={filterKey}
                                />
                        ))
                    }
                </ul>
                {splitScreen  
                &&
                <div className={styles['email-body-container']}>
                 <EmailBody filterKey={filterKey} setSplitScreen={setSplitScreen} selectedEmailId={selectedEmailId} />
                </div>}
            </main> 
        )
    }
    {error && <div>{error}</div>}
    </>
    )
}

export default Main;