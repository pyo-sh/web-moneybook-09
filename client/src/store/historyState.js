import { makeObservable } from "@core/Observer";

export const historyState = makeObservable({
    date: null,
    content: null,
    paymentMethod: null,
    amount: null,
    id: null,
    isIncome: null,
});
