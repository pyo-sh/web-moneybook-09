import request from "@utils/request";

export const getHistoriesByMonth = async (date) => {
    const data = await request.get({ url: `/history`, query: { date } });
    return data;
};
