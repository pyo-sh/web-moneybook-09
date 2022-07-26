import { makeObservable } from "@core/Observer";
import { getAllPaymentMethod } from "@apis/paymentMethodApi";

const state = makeObservable({
    value: {},
    isLoading: true,
});

const fetchData = async () => {
    const { paymentMethods } = await getAllPaymentMethod();
    state.value = paymentMethods;
    console.log(state);
};

const getPaymentMethodById = (id) => {
    const { value } = state;
    return id ? value[id]["name"] : undefined;
};

const getPaymentMethodIds = () => {
    const { value } = state;
    return Object.keys(value);
};

(async function () {
    await fetchData();
    state.isLoading = false;
})();

export default { fetchData, state, getPaymentMethodIds, getPaymentMethodById };
