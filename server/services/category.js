const CategoryModel = require("../models/category");

module.exports = (function CategoryService() {
    async function addCategory(data) {
        return await CategoryModel.create({ data });
    }

    async function getCategoryAll() {
        return await CategoryModel.findAll();
    }

    async function editCategory(id, data) {
        return await CategoryModel.updateById({ id, data });
    }

    async function deleteCategory(id) {
        return await CategoryModel.delete({ id });
    }

    return {
        addCategory,
        getCategoryAll,
        editCategory,
        deleteCategory,
    };
})();
