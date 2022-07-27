import { makeObservable, subscribe } from "@core/Observer";
import { getHistoriesByMonth } from "@apis/history";
import controlDate from "@store/controlDate";
import { getYearMonth } from "@utils/date";
import loader from "@store/loader";

const state = makeObservable({
    details: [],
});

async function initState() {
    state.details = [];
    loader.state.isHistoriesLoading = true;

    const currentDate = controlDate.state.value;
    const dateString = getYearMonth(currentDate);

    const { histories } = await getHistoriesByMonth({ query: { date: dateString } });
    state.details = histories;
    loader.state.isHistoriesLoading = false;
}

subscribe(controlDate.state, initState);
initState();

const getFilteredHistories = ({ isIncomeSelected, isPaidSelected }) => {
    return state.details.filter(({ isIncome }) => {
        const renderIncome = isIncomeSelected && isIncome;
        const renderPaid = isPaidSelected && !isIncome;
        return renderIncome || renderPaid;
    });
};

const getTotals = () => {
    return state.details.reduce(
        ([inTotal, outTotal], { isIncome, amount }) => {
            const income = isIncome ? amount : 0;
            const paid = isIncome ? 0 : amount;
            return [inTotal + income, outTotal + paid];
        },
        [0, 0],
    );
};

/**
 * 일 별로 나누어서 렌더링 하기 위한 key : value 변환 작업
 * @param {*} array History 데이터 들의 집합
 * @returns {*} Object 형식으로 key를 date로 value로 array 집합을 나타냄
 */
const groupHistoriesByDate = (array) => {
    return array.reduce((returnObj, targetObj) => {
        // ex) Date Object to 2022.07.18
        const { date: stringDate, isIncome, amount } = targetObj;

        if (!returnObj[stringDate]) {
            returnObj[stringDate] = {
                incomeTotal: 0,
                paidTotal: 0,
                histories: [],
            };
        }

        const dateObj = returnObj[stringDate];
        dateObj.histories.push({ ...targetObj, date: stringDate });
        dateObj.incomeTotal += isIncome ? amount : 0;
        dateObj.paidTotal += isIncome ? 0 : amount;
        return returnObj;
    }, {});
};


const groupPaymentSumByCategory = () => {
    if (state.details.length === 0) {
        return;
    }
    return state.details
        .filter((detail) => detail.isIncome === 0)
        .reduce((historySumMap, history) => {
            const { category, amount } = history;
            if (category in historySumMap) {
                historySumMap[category] += amount;
            } else {
                historySumMap[category] = amount;
            }
            return historySumMap;
        }, {});
};

const historiesUpdate = (newHistory) => {
    const newHistories = state.details.filter(({ id }) => newHistory.id !== id);
    state.details = [newHistory, ...newHistories];
};

export default {
    state,
    getFilteredHistories,
    getTotals,
    groupHistoriesByDate,
    groupPaymentSumByCategory,
    historiesUpdate,
};
