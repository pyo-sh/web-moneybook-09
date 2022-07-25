const express = require("express");
const router = express.Router();
const CategoryService = require("../services/category");

router.get("/", async (req, res) => {
    const categories = await CategoryService.getCategoryAll();
    return res.send(categories);
});

router.post("/", async (req, res) => {
    const { body } = req;
    const data = await CategoryService.addCategory(body);
    return res.send(data);
});

router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const data = await CategoryService.editCategory(id, body);
    return res.send(data);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await CategoryService.deleteCategory(id);
    return res.send({ message: "Successfully Deleted" });
});

module.exports = router;
