const CategoryModel = require("../models/category");
const { formatPropertyToSnake, formatPropertyToCamel } = require("../utils/format");

module.exports = (function CategoryService() {
    async function addCategory(body) {
        const pureData = { ...body };
        const data = formatPropertyToSnake(body);

        const dbResult = await CategoryModel.create({ data });
        return {
            ...pureData,
            ...dbResult,
        };
    }

    async function getCategoryAll() {
        const dbResults = await CategoryModel.findAll();
        return dbResults.map(formatPropertyToCamel);
    }

    async function editCategory(id, body) {
        const pureData = { ...body };
        const data = formatPropertyToSnake(body);

        await CategoryModel.updateById({ id, data });
        return { ...pureData, id };
    }

    async function deleteCategory(id) {
        return await CategoryModel.deleteById({ id });
    }

    return {
        addCategory,
        getCategoryAll,
        editCategory,
        deleteCategory,
    };
})();
