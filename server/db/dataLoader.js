const pool = require("../db/loader");
const checkHistoryTable = require("./checkTable/history");
const checkPaymentMethodTable = require("./checkTable/paymentMethod");
const checkCategoryTable = require("./checkTable/category");

(async function init() {
    const { deleteTables, insertMock } = require("./mock");

    await deleteTables(pool);

    await checkPaymentMethodTable(pool);
    await checkCategoryTable(pool);

    await checkHistoryTable(pool);

    console.log("ALL TABLE CHECKED!");

    await insertMock();
})();
