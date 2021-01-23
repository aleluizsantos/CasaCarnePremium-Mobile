import { parseISO, format, subMinutes  } from 'date-fns';

const formatDataTime = (_dateTime) => {
    const dateTime = parseISO(_dateTime);  
    const formattedDate = format(subMinutes(dateTime, dateTime.getTimezoneOffset()), "dd/MM/yyyy kk:mm:ss", {timeZone: "UTC"});
    
    return formattedDate;
}

export default formatDataTime;