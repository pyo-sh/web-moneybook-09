const express = require("express");
const router = express.Router();
const categoryRouter = require("./category");
const historyRouter = require("./history");

router.use("/category", categoryRouter);
router.use("/history", historyRouter);

/* Error Controller */
router.use(function (err, req, res, next) {
    const { status, message } = err;
    if (status < 400) {
        next();
    }
    res.status(status).send({ error: message });
});

module.exports = router;
