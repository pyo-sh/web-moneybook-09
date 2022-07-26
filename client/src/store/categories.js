import { makeObservable } from "@core/Observer";
import { getAllCategories } from "@apis/categoryApi";

const state = makeObservable({
    value: {},
    isLoading: true,
});

const fetchData = async () => {
    const { categories } = await getAllCategories();
    state.value = categories;
    console.log(state);
};

const getCategoryById = (id) => {
    const { value } = state;
    return id ? value[id]["name"] : undefined;
};

const filterCategoryIds = (isIncome) => {
    const selectedIds = Object.entries(state.value)
        .filter(([id, category]) => Boolean(category.isIncome) === isIncome)
        .map(([id, category]) => id);

    return selectedIds;
};

(async function () {
    await fetchData();
    state.isLoading = false;
})();

export default { fetchData, state, getCategoryById, filterCategoryIds };
