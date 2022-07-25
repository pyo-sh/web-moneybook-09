const PaymentMethodModel = require("../models/paymentMethod");
const { formatPropertyToSnake, formatPropertyToCamel } = require("../utils/format");

module.exports = (function PaymentMethodService() {
    async function addPaymentMethod(body) {
        const pureData = { ...body };
        const data = formatPropertyToSnake(body);

        const id = await PaymentMethodModel.create({ data });
        return {
            ...pureData,
            id,
        };
    }

    async function getPaymentMethodAll() {
        const dbResults = await PaymentMethodModel.findAll();
        return dbResults.map(formatPropertyToCamel);
    }

    async function editPaymentMethod(id, body) {
        const data = formatPropertyToSnake(body);

        const isSuccess = await PaymentMethodModel.updateById({ id, data });
        if (isSuccess) {
            const category = await PaymentMethodModel.findById({ id });
            return formatPropertyToCamel(category);
        } else {
            throw Error("Edit Category : Error on PaymentMethodModel.updateById");
        }
    }

    async function deletePaymentMethod(id) {
        return await PaymentMethodModel.deleteById({ id });
    }

    return {
        addPaymentMethod,
        getPaymentMethodAll,
        editPaymentMethod,
        deletePaymentMethod,
    };
})();
