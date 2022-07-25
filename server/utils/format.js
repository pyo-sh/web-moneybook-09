const { getFormatDate } = require("../utils/time");

const snakeToCamel = (str) =>
    str
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));

const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const formatPropertyToSnake = (object) => {
    return Object.entries(object).reduce((newObject, [key, value]) => {
        const snakeKey = camelToSnakeCase(key);
        newObject[snakeKey] = value;
        return newObject;
    }, {});
};

const formatPropertyToCamel = (object) => {
    return Object.entries(object).reduce((newObject, [key, value]) => {
        const camelKey = snakeToCamel(key);
        newObject[camelKey] = value;
        return newObject;
    }, {});
};

/**
 * 일 별로 나누어서 렌더링 하기 위한 key : value 변환 작업
 * @param {*} array History 데이터 들의 집합
 * @returns {*} Object 형식으로 key를 date로 value로 array 집합을 나타냄
 */
const groupObjectByDate = (array) => {
    return array.reduce((returnObj, targetObj) => {
        // ex) Date Object to 2022.07.18
        const stringDate = getFormatDate(targetObj.date).replaceAll("-", ".");

        if (!returnObj[stringDate]) {
            returnObj[stringDate] = [];
        }

        returnObj[stringDate].push({ ...targetObj, date: stringDate });
        return returnObj;
    }, {});
};

module.exports = {
    snakeToCamel,
    camelToSnakeCase,
    formatPropertyToSnake,
    formatPropertyToCamel,
    groupObjectByDate,
};
