import { makeObservable } from "@core/Observer";

export const SelectedHistoryState = makeObservable({
    date: null,
    content: null,
    paymentMethod: null,
    amount: null,
    id: null,
    isIncome: null,
});

export const modalType = makeObservable({
    value: null,
});
