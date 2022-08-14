const HistoryService = require("../services/history");
const CategoryService = require("../services/category");
const PaymentMethodService = require("../services/paymentMethod");

const CATEGORIES = [
    {
        name: "생활",
        color: "#4A6CC3",
        isIncome: false,
    },
    {
        name: "식비",
        color: "#4CA1DE",
        isIncome: false,
    },
    {
        name: "교통",
        color: "#94D3CC",
        isIncome: false,
    },
    {
        name: "쇼핑/뷰티",
        color: "#4CB8B8",
        isIncome: false,
    },
    {
        name: "의료/건강",
        color: "#6ED5EB",
        isIncome: false,
    },
    {
        name: "문화/여가",
        color: "#D092E2",
        isIncome: false,
    },
    {
        name: "미분류",
        color: "#817DCE",
        isIncome: false,
    },
    {
        name: "월급",
        color: "#B9D58C",
        isIncome: true,
    },
    {
        name: "용돈",
        color: "#E6D267",
        isIncome: true,
    },
    {
        name: "기타수입",
        color: "#E2B765",
        isIncome: true,
    },
];

const PAYMENT_METHODS = [
    {
        name: "현금",
    },
    {
        name: "신용카드",
    },
    {
        name: "현대카드",
    },
];

function createHistories(categories, paymentMethods) {
    const COUNTS = 240;
    const result = Array.from(new Array(COUNTS), (_, i) => {
        const mockMonth = Math.floor(Math.random() * 12 + 1)
            .toString()
            .padStart(2, "0");
        const mockDay = Math.floor(Math.random() * 30 + 1)
            .toString()
            .padStart(2, "0");
        const mockDate = new Date(`2022-${mockMonth}-${mockDay}`);

        const mockCategoryIndex = Math.floor(Math.random() * categories.length);
        const mockPaymentMethodIndex = Math.floor(Math.random() * paymentMethods.length);
        const mockCategoryId = categories[mockCategoryIndex].id;
        const mockPaymentMethodId = paymentMethods[mockPaymentMethodIndex].id;

        return {
            date: `
                2022.${(mockDate.getMonth() + 1).toString().padStart(2, "0")}.${mockDate
                .getDate()
                .toString()
                .padStart(2, "0")}
            `,
            content: `저는 ${i.toString().padStart(4, "0")}번째 내용입니다~`,
            category: mockCategoryId,
            isIncome: CATEGORIES[mockCategoryIndex].isIncome,
            amount: Math.floor(Math.random() * 150000),
            paymentMethod: mockPaymentMethodId,
        };
    });
    return result;
}

module.exports = {
    deleteTables: async (pool) => {
        await pool.execute(`
            DROP TABLE history
        `);
        console.log("HISTORY table deleted");

        await pool.execute(`
            DROP TABLE category
        `);
        console.log("CATEGORY table deleted");

        await pool.execute(`
            DROP TABLE payment_method
        `);
        console.log("PAYMENT_METHOD table deleted");
    },
    insertMock: async () => {
        try {
            const categories = await Promise.all(
                Object.values(CATEGORIES).map((object) => CategoryService.addCategory(object)),
            );
            console.log("All Categories Inserted");

            const paymentMethods = await Promise.all(
                Object.values(PAYMENT_METHODS).map((object) =>
                    PaymentMethodService.addPaymentMethod(object),
                ),
            );
            console.log("All PaymentMethods Inserted");

            const HISTORIES = createHistories(categories, paymentMethods);
            await Object.values(HISTORIES).reduce((acc, object) => {
                return acc.then(() => HistoryService.addHistory(object));
            }, new Promise((resolve) => resolve(3)));
            console.log("All Histories Inserted");
        } catch (e) {
            console.log(e);
        }
    },
};
