import { makeObservable } from "@core/Observer";
import { getAllCategories } from "@apis/categoryApi";
import loader from "@store/loader";

const state = makeObservable({
    value: {},
});

const fetchData = async () => {
    loader.state.isCategoriesLoading = true;
    const { categories } = await getAllCategories();
    state.value = categories;
    loader.state.isCategoriesLoading = false;
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

(async function initCategories() {
    await fetchData();
})();

export default { state, fetchData, getCategoryById, filterCategoryIds };
