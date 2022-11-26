
const convertDateToMilliseconds = (date) => {
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    const hours = date.substring(11, 13);
    const minutes = date.substring(14, 16);
    const dateString = new Date(year, month, day, hours, minutes);
    return Date.parse(date);
}


module.exports = {
    convertDateToMilliseconds
}