export const getFormattedDateTime = (date) => {
    if(date) {
        const actualTime = new Date(date).toLocaleTimeString([],{
            hour: '2-digit',
            minute: '2-digit',
        }) 
        const time = actualTime.split(' ')[0]
        console.log("asdasdas",actualTime, time, date)
        const timeConvention = actualTime.split(' ')[1].toLowerCase()
    
        const formattedDate = new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        })
        
        return `${formattedDate} ${time+timeConvention}`;
    }
}