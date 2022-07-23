const pool = require("../db/loader");
const { getCreateQuery, getUpdateQuery, getDeleteQuery } = require("../utils/query");
const { getNextMonth, getMonthDate } = require("../utils/time");
const { formatPropertyToSnake, formatPropertyToCamel } = require("../utils/time");

// TODO
module.exports = (function HistoryModel() {
    const TABLE_NAME = "history";
    const COLUMNS = ["id", "date", "is_income", "category", "content", "payment_method", "amount"];
    const TABLE_INFO = {
        tableName: TABLE_NAME,
        columns: COLUMNS,
    };

    async function create({ data }) {
        data = formatPropertyToSnake(data);
        const query = getCreateQuery(TABLE_INFO, data);
        const [rows] = await pool.execute(query);
        return rows[0];
    }

    async function findByRange({ startDate, endDate }) {
        const query = `
            SELECT *
            FROM history
            WHERE date
            BETWEEN '${startMonth}' AND '${endMonth}'
        `;
        const [rows] = await pool.execute(query, values);
        return rows;
    }

    async function updateById({ id, data }) {
        data = formatPropertyToSnake(data);
        const query = getUpdateQuery(TABLE_INFO, id, data);
        const [rows] = await pool.execute(query);
        return rows[0];
    }

    async function deleteById({ id }) {
        const query = getDeleteQuery(TABLE_INFO, id);
        return await pool.execute(query);
    }

    return { create, updateById, deleteById, findByRange };
})();
