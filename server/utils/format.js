const snakeToCamel = (str) =>
    str
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));

const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const formatPropertyToSnake = (object) => {
    Object.entries(object).reduce((newObject, [key, value]) => {
        const snakeKey = camelToSnakeCase(key);
        newObject[snakeKey] = value;
        return newObject;
    }, {});
};

const formatPropertyToCamel = (object) => {
    return Object.entries(obejct).reduce((newObject, [key, value]) => {
        const camelKey = snakeToCamel(key);
        newObject[camelKey] = value;
        return newObject;
    }, {});
};

module.exports = {
    snakeToCamel,
    camelToSnakeCase,
    formatPropertyToSnake,
    formatPropertyToCamel,
};
