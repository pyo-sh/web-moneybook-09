import request from "@utils/request";

export const getHistoriesByMonth = async ({ query }) => {
    const data = await request.get({ url: `/history`, query });
    return data;
};
