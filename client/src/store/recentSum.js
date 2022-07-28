import { makeObservable } from "@core/Observer";
import { getRecentSumsByCategory } from "@apis/history";
import { getYearMonth } from "@utils/date";

const state = makeObservable({
    value: {},
});

async function fetchData({ category, date }) {
    state.value = {};

    const currentDate = new Date(date.replaceAll(".", "-"));
    const dateString = getYearMonth(currentDate);

    const { recentSums } = await getRecentSumsByCategory({
        query: { date: dateString, category },
    });
    state.value = recentSums;
}

export default {
    state,
    fetchData,
};
