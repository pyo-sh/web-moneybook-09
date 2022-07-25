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
 * @param {} value
 * @returns
 * yyyy.mm.dd 형태의 string이 실제 date와 같은지 알려준다.
 */
export const validateDate = (value) => {
    const birthRegex = /^(\d{4})\.(\d{2})\.(\d{2})$/g;
    const yyyymmdd = value.replace(/\./g, "");

    const y = yyyymmdd.substr(0, 4);
    const m = yyyymmdd.substr(4, 2) - 1;
    const d = yyyymmdd.substr(6, 2);
    const newDate = new Date(y, m, d);

    return value.match(birthRegex) && formatDate(newDate) === yyyymmdd;
};

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
