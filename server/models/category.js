const pool = require("../db/loader");
const { getCreateQuery, getUpdateQuery, getDeleteQuery } = require("../utils/query");
const { formatPropertyToSnake, formatPropertyToCamel } = require("../utils/format");

module.exports = (function CategoryModel() {
    const TABLE_NAME = "category";
    const COLUMNS = ["id", "name", "color", "is_income"];
    const TABLE_INFO = {
        tableName: TABLE_NAME,
        columns: COLUMNS,
    };

    async function create({ data }) {
        const pureData = { ...data };
        data = formatPropertyToSnake(data);
        const query = getCreateQuery(TABLE_INFO, data);
        const [fields] = await pool.execute(query);
        return {
            id: fields.insertId,
            ...pureData,
        };
    }

    async function findAll() {
        const query = `
            SELECT *
            FROM ${TABLE_NAME}
        `;
        const [rows] = await pool.execute(query);
        return rows.map(formatPropertyToCamel);
    }

    async function updateById({ id, data }) {
        const pureData = { ...data };
        data = formatPropertyToSnake(data);
        const query = getUpdateQuery(TABLE_INFO, id, data);
        const [fields] = await pool.execute(query);
        if (fields.affectedRows <= 0) {
            throw Error("Database Row didn't Affected");
        }
        return {
            id,
            ...pureData,
        };
    }

    async function deleteById({ id }) {
        const query = getDeleteQuery(TABLE_INFO, id);
        return await pool.execute(query);
    }

    return { create, findAll, updateById, deleteById };
})();
