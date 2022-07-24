/**
 * date객체를 yyyy-mm-dd 형태로 만들어준다.
 */
function getFormatDate(date) {
    let year = date.getFullYear(); //yyyy
    let month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : `0${month}`; //month 두자리로 저장
    let day = date.getDate(); //d
    day = day >= 10 ? day : `0${day}`; //day 두자리로 저장

    return [year, month, day].join("-"); // yyyy-mm-dd
}

function getFormatDateByInterval(date, interval) {
    const monthFirstDate = new Date(date.getTime());
    monthFirstDate.setMonth(monthFirstDate.getMonth() + interval);
    return getFormatDate(monthFirstDate);
}
module.exports = { getFormatDate, getFormatDateByInterval };
