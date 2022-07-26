import { makeObservable } from "@core/Observer";

// histories에서 아이템을 클릭하면 전역 historyState가 변한다. 한번 더 누르면 다시 초기화 된다.(resetHistoryState)사용
export const historyState = makeObservable({
    date: null,
    content: null,
    paymentMethod: null,
    amount: null,
    category: null,
    id: null,
    isIncome: null,
    isClick: false,
});

export const resetHistoryState = () => {
    historyState.date = null;
    historyState.content = null;
    historyState.paymentMethod = null;
    historyState.amount = null;
    historyState.category = null;
    historyState.id = null;
    historyState.isIncome = null;
    historyState.isClick = false;
};
