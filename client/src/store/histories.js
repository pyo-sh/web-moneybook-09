import { makeObservable } from "@core/Observer";
import { API } from "@apis/";
import { getHistoriesByMonth } from "@apis/history";
import controlDate from "@store/controlDate";
import { getYearMonth } from "@utils/date";

const state = makeObservable({
    value: {},
});

(async function initState() {
    const currentDate = controlDate.state.value;
    const dateString = getYearMonth(currentDate);

    const { histories } = await API.call(getHistoriesByMonth, dateString);
    state.value = histories;
})();

export default {
    state,
};
