const pool = require("../db/loader");
const {
    getCreateQuery,
    getReadByIdQuery,
    getUpdateQuery,
    getDeleteQuery,
} = require("../utils/query");

module.exports = (function HistoryModel() {
    const TABLE_NAME = "history";
    const COLUMNS = ["id", "date", "is_income", "category", "content", "payment_method", "amount"];
    const TABLE_INFO = {
        tableName: TABLE_NAME,
        columns: COLUMNS,
    };

    async function create({ data }) {
        const query = getCreateQuery(TABLE_INFO, data);
        const [fields] = await pool.execute(query);
        return fields.insertId;
    }

    async function findById({ id }) {
        const query = getReadByIdQuery(TABLE_INFO, id);
        const [rows] = await pool.execute(query);
        return rows[0];
    }

    async function findByRange({ startDate, endDate }) {
        const query = `
            SELECT *
            FROM ${TABLE_NAME}
            WHERE date
            BETWEEN '${startDate}' AND '${endDate}'
        `;
        const [rows] = await pool.execute(query);
        return rows;
    }

    async function updateById({ id, data }) {
        const query = getUpdateQuery(TABLE_INFO, id, data);
        const [fields] = await pool.execute(query);

        if (fields.affectedRows <= 0) {
            console.log(fields);
            throw Error("Database Row didn't Affected");
        }

        return true;
    }

    async function deleteById({ id }) {
        const query = getDeleteQuery(TABLE_INFO, id);
        const [fields] = await pool.execute(query);

        if (fields.affectedRows <= 0) {
            throw Error("Database Row didn't Affected");
        }

        return id;
    }

    async function countAmountByMonth({ categoryId, startDate, endDate }) {
        const query = `
            SELECT FORMAT(GetDate(),'yyyy.MM') AS 'date', CAST(SUM (amount) AS UNSIGNED) AS 'total'
            FROM ${TABLE_NAME} AS h
                INNER JOIN category AS c
                ON h.category = c.id
            WHERE h.category = ${categoryId} AND 
                h.date BETWEEN '${startDate}' AND '${endDate}'
            GROUP BY FORMAT(GetDate(),'yyyy.MM')
            ORDER BY FORMAT(GetDate(),'yyyy.MM')
        `;

        const sums = await pool.execute(query);
        return sums;
    }

    return { create, findById, findByRange, updateById, deleteById, countAmountByMonth };
})();
