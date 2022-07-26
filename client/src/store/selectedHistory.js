import { makeObservable } from "@core/Observer";

// histories에서 아이템을 클릭하면 전역 historyState가 변한다. 한번 더 누르면 다시 초기화 된다.(resetHistoryState)사용
export const state = makeObservable({
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
    state.date = null;
    state.content = null;
    state.paymentMethod = null;
    state.amount = null;
    state.category = null;
    state.id = null;
    state.isIncome = null;
    state.isClick = false;
};

export default { state, resetHistoryState };
