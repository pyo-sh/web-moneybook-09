import { makeObservable } from "@core/Observer";

export const modalState = makeObservable({
    value: null,
    type: null,
});
