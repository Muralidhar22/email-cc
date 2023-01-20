export const persistEmailList = (list, page) => {
    const persistedList = JSON.parse(localStorage.getItem('email-list'));
    localStorage.setItem('email-list',JSON.stringify(persistedList
         ? {...persistedList, [page]: list}
         : { [page]: list }))
}

export const updatePersistedEmailList = (id, key, value, page) => {
    const persistedList = JSON.parse(localStorage.getItem('email-list'));
    persistedList[page] = persistedList[page].map((email) => (
        email.id === id
        ? { ...email, [key]: value }
        : email
    ))
    localStorage.setItem('email-list', JSON.stringify(persistedList))
}

export const getPersistedEmailStatus = () => localStorage.getItem('email-status') 
? JSON.parse(localStorage.getItem('email-status'))
: null;

export const setPersistedEmailStatus = (emailId, statusType) => {
    let persistedStatus = JSON.parse(localStorage.getItem('email-status'))
    if(persistedStatus 
      &&
      persistedStatus[statusType] 
      &&
     !persistedStatus[statusType].includes(emailId)){
       persistedStatus = { ...persistedStatus, [statusType]: [...persistedStatus[statusType],emailId] }
    } else if (persistedStatus && !persistedStatus[statusType].includes(emailId)) {
       persistedStatus = { ...persistedStatus , [statusType]: [emailId] }
    } else if (!persistedStatus){
        persistedStatus = { [statusType]: [emailId] }
    }

    localStorage.setItem('email-status', JSON.stringify(persistedStatus))
}