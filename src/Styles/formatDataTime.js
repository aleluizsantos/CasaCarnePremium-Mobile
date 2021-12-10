import { parseISO, format } from "date-fns";

const formatDataTime = (_dateTime) => {
  const parsedDate = parseISO(_dateTime);
  // const formattedDate = format(subMinutes(dateTime, dateTime.getTimezoneOffset()), "dd/MM/yyyy kk:mm:ss", {timeZone: "UTC"});
  const formattedDate = format(parsedDate, "dd/MM/yyyy kk:mm:ss", {
    timeZone: "America/Sao_Paulo",
  });

  return formattedDate;
};

export default formatDataTime;
