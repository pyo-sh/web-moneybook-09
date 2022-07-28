import { makeObservable } from "@core/Observer";
import { getExpendituresByCategory } from "@apis/history";
import { getYearMonth } from "@utils/date";

const state = makeObservable({
    value: [],
});

async function fetchData({ category, date }) {
    state.value = [];

    const currentDate = new Date(date.replaceAll(".", "-"));
    const dateString = getYearMonth(currentDate);

    const { expenditures } = await getExpendituresByCategory({
        query: { date: dateString, category },
    });
    state.value = expenditures;
}

export default {
    state,
    fetchData,
};
