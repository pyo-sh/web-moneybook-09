const CONTENT_MAX_LENGTH = 150;

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
 * @param {} value
 * @returns
 * yyyy.mm.dd 형태의 string이 실제 date와 같은지 알려준다.
 */
export const validateDate = (value) => {
    const dateRegex = /^(\d{4})\.(\d{2})\.(\d{2})$/g;
    const yyyymmdd = value.replace(/\./g, "");

    const y = yyyymmdd.substr(0, 4);
    const m = yyyymmdd.substr(4, 2) - 1;
    const d = yyyymmdd.substr(6, 2);
    const newDate = new Date(y, m, d);

    return value.match(dateRegex) && formatDateToString(newDate) === yyyymmdd;
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

export const validateAmount = (value) => Number(value) > 0;

export const validateContent = (value) => value && value.length < CONTENT_MAX_LENGTH;

export const validatePaymentMethod = (value) => value;

export const validateIsIncome = (value) => value !== null;

export const validateHistoryForm = (historyFormInputs) => {
    const validateMap = {
        date: validateDate,
        content: validateContent,
        paymentMethod: validatePaymentMethod,
        amount: validateAmount,
        isIncome: validateIsIncome,
    };

    return Object.entries(historyFormInputs).every(([key, value]) =>
        validateMap[key] ? validateMap[key](value) : true,
    );
};
