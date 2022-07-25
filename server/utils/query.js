const PROPERTY_ERROR = "Invalid Data Property";
const ID_ERROR = "Invalid ID Type";

/**
 * Object를 테이블 데이터로 들고 있을 때 query string 으로 바꾸어주는 함수
 * @param object 테이블 데이터
 * @return "key=value, key2=value2 ..."
 */
const objectToQuerySet = (obj) => {
    const entries = Object.entries(obj);
    return entries
        .reduce((set, [key, value]) => {
            if (typeof value === "boolean") {
                value = Number(value);
            }
            set.push(`${key} = "${value}"`);
            return set;
        }, [])
        .join(",");
};

/**
 * Column 속성 중에서 key 값이 있는지 확인하는 함수
 * @param array Column 들을 들고있는 String 들의 집합
 * @param object 데이터
 * @return true | false
 */
const hasColumnProperty = (columns, data) => {
    const keys = Object.keys(data);
    return keys.every((key) => columns.includes(key));
};

const getCreateQuery = ({ tableName, columns }, data) => {
    if (!hasColumnProperty(columns, data)) {
        throw Error(`Create Query : ${PROPERTY_ERROR}`);
    }

    const querySet = objectToQuerySet(data);
    return `
        INSERT
        INTO ${tableName}
        SET ${querySet}
    `;
};

const getUpdateQuery = ({ tableName, columns }, id, data) => {
    if (!hasColumnProperty(columns, data)) {
        throw Error(`Update Query : ${PROPERTY_ERROR}`);
    }

    const querySet = objectToQuerySet(data);
    return `
        UPDATE ${tableName}
        SET ${querySet}
        WHERE id = ${id}
    `;
};

const getDeleteQuery = ({ tableName }, id) => {
    if (typeof id !== "number") {
        throw Error(`Delete Query : ${ID_ERROR}`);
    }

    return `
        DELETE
        FROM ${tableName}
        WHERE id = ${id};
    `;
};

module.exports = {
    getCreateQuery,
    getUpdateQuery,
    getDeleteQuery,
};
