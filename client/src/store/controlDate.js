import { makeObservable } from "@core/Observer";
import { changeDateMonth } from "@utils/date";

const state = makeObservable({
    value: new Date(),
});

const movePrev = () => {
    state.value = changeDateMonth(state.value, -1);
};
const moveNext = () => {
    state.value = changeDateMonth(state.value, +1);
};

export default {
    state,
    movePrev,
    moveNext,
};
