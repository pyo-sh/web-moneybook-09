const CategoryModel = require("../models/category");
const { formatPropertyToSnake, formatPropertyToCamel } = require("../utils/format");

module.exports = (function CategoryService() {
    async function addCategory(body) {
        const pureData = { ...body };
        const data = formatPropertyToSnake(body);

        const id = await CategoryModel.create({ data });
        return {
            ...pureData,
            id,
        };
    }

    async function getCategoryAll() {
        const dbResults = await CategoryModel.findAll();
        return dbResults.map(formatPropertyToCamel);
    }

    async function editCategory(id, body) {
        const data = formatPropertyToSnake(body);

        const isSuccess = await CategoryModel.updateById({ id, data });
        if (isSuccess) {
            const category = await CategoryModel.findById({ id });
            return formatPropertyToCamel(category);
        } else {
            throw Error("Edit Category : Error on CategoryModel.updateById");
        }
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
