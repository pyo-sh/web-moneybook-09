import { makeObservable } from "@core/Observer";
import { getAllCategories } from "@apis/categoryApi";

const state = makeObservable({
    value: {},
    isLoading: true,
});

const fetchData = async () => {
    const { categories } = await getAllCategories();
    state.value = categories;
    state.isLoading = false;
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

async function initCategories() {
    state.isLoading = true;
    await fetchData();
}
initCategories();

export default { fetchData, state, getCategoryById, filterCategoryIds };
