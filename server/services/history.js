const HistoryModel = require("../models/history");
const { getFormatDateByInterval } = require("../utils/time");

module.exports = (function HistoryService() {
    async function addHistory(data) {
        const history = await HistoryModel.create({ data });
        return history;
    }

    async function deleteHistory(id) {
        return await HistoryModel.delete({ id });
    }

    async function editHistory(id, data) {
        return await HistoryModel.updateById({ id, data });
    }

    async function getHistoryByMonth(date) {
        const startDate = `${date}.01`.replace(".", "-");
        const endDate = getFormatDateByInterval(new Date(startDate), 1);

        return await HistoryModel.findByRange({
            startDate,
            endDate,
        });
    }

    async function getHistoryRecentSum(categoryId, date) {
        const currentDate = new Date(`${date}.01`.replace(".", "-"));

        const startDate = getFormatDateByInterval(currentDate, -6);
        const endDate = getFormatDateByInterval(currentDate, 6);

        return await HistoryModel.findByRange({ startDate, endDate });
    }

    return { addHistory, editHistory, deleteHistory, getHistoryByMonth, getHistoryRecentSum };
})();
