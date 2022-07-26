import { makeObservable } from "@core/Observer";
import { getAllPaymentMethod } from "@apis/paymentMethodApi";

const state = makeObservable({
    value: {},
    isLoading: true,
});

const fetchData = async () => {
    const { paymentMethods } = await getAllPaymentMethod();
    state.value = paymentMethods;
    state.isLoading = false;
};

const getPaymentMethodById = (id) => {
    const { value } = state;
    return id ? value[id]["name"] : undefined;
};

const getPaymentMethodIds = () => {
    const { value } = state;
    return Object.keys(value);
};

async function initPaymentMethods() {
    state.isLoading = true;
    await fetchData();
}
initPaymentMethods();

export default { fetchData, state, getPaymentMethodIds, getPaymentMethodById };
