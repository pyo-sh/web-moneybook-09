const express = require("express");
const router = express.Router();
const categoryRouter = require("./category");
const paymentMethodRouter = require("./paymentMethod");

router.use("/category", categoryRouter);
router.use("/payment-method", paymentMethodRouter);

/* Error Controller */
router.use(function (err, req, res, next) {
    const { status, message } = err;
    if (status < 400) {
        next();
    }
    res.status(status).send({ error: message });
});

module.exports = router;
