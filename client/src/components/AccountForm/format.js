/**
 *
 * @param {} value
 * @returns
 * 숫자를 yyyy.mm.dd로 바꿔준다.
 */
export const formatDate = (value) => {
    return value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1.$2.$3")
        .replace(/(\.{1,2})$/g, "");
};

/**
 *
 * @param {*} date
 * @returns
 * date객체를 yyyy.mm.dd로 바꾼다.
 */
export function formatDateToString(date) {
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    let year = date.getFullYear();

    if (month.length < 2) {
        month = `0${month}`;
    }
    if (day.length < 2) {
        day = `0${day}`;
    }
    return [year, month, day].join("");
}

/**
 *
 * @param {*} value
 * @returns
 * input value를 원 단위로 포멧팀 한다.
 */
export const formatAmount = (value) => {
    if (!value) {
        return "";
    }

    const digitString = value.replace(/[^0-9]/g, "");
    const formattedAmount = digitString ? Number(digitString).toLocaleString() : "";

    return formattedAmount;
};
