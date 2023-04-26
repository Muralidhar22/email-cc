import { format } from "date-fns";

export const getFormattedDateTime = (date) => {
    if(date) {
        const actualTime = new Date(date)
        
        const timeConvention = format(actualTime, 'hh:mm a')
    
        const formattedDate = new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        })
        
        return `${formattedDate} ${timeConvention}`;
    }
}