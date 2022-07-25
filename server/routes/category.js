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

module.exports = router;
