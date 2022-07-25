const HistoryModel = require("../models/history");
const { formatPropertyToSnake, formatPropertyToCamel } = require("../utils/format");
const { getFormatDateByInterval } = require("../utils/time");

module.exports = (function HistoryService() {
    async function addHistory(body) {
        const pureData = { ...body };
        const data = formatPropertyToSnake(body);

        const id = await HistoryModel.create({ data });
        return {
            ...pureData,
            id,
        };
    }

    async function getHistoryByMonth(date) {
        const startDate = `${date}.01`.replace(".", "-");
        const endDate = getFormatDateByInterval(new Date(startDate), 1);

        const dbResults = await HistoryModel.findByRange({
            startDate,
            endDate,
        });
        // TODO : Array to Object => year.month is key
        const histories = dbResults.map(formatPropertyToCamel);
        return histories;
    }

    async function editHistory(id, body) {
        const data = formatPropertyToSnake(body);

        const isSuccess = await HistoryModel.updateById({ id, data });
        if (isSuccess) {
            const history = await HistoryModel.findById({ id });
            return formatPropertyToCamel(history);
        } else {
            throw Error("Edit History : Error on HistoryModel.updateById");
        }
    }

    async function deleteHistory(id) {
        return await HistoryModel.deleteById({ id });
    }

    async function getHistoryRecentSum(categoryId, date) {
        const currentDate = new Date(`${date}.01`.replace(".", "-"));

        const startDate = getFormatDateByInterval(currentDate, -6);
        const endDate = getFormatDateByInterval(currentDate, 6);

        return await HistoryModel.findByRange({ startDate, endDate });
    }

    return { addHistory, editHistory, deleteHistory, getHistoryByMonth, getHistoryRecentSum };
})();
