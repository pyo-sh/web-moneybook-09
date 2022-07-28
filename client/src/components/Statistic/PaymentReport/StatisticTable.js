import { div, ul, span, li } from "@core/CreateDom";
import categories from "@store/categories";
import recentSum from "@store/recentSum";
import { formatAmount } from "@utils/format";

const StatisticTable = ({ totalExpenditure, historySumList }) => {
    const categorySumList = historySumList.map(([categoryId, sum]) => {
        const onClickCategory = () => {
            recentSum.fetchData({ category: categoryId });
        };

        const { name, color } = categories.getCategoryById(categoryId);
        const percentage = Math.round((sum / totalExpenditure) * 100) || 0;

        return li({ class: "item text_body_medium", event: { click: onClickCategory } })(
            div({
                style: `background-color: ${color}`,
                class: "itemCategory text_bold_medium",
            })(name),
            div({ class: "percentage text_body_medium " })(`${percentage}%`),
            div({ class: "totalPayment text_body_medium" })(formatAmount(sum)),
        );
    });

    return div({ class: "reportTable" })(
        div({ class: "summary text_body_large" })(
            span(`이번달 지출 금액`),
            span({ class: "totalExpenditure" })(formatAmount(totalExpenditure || "0")),
        ),
        ul(...categorySumList),
    );
};

export default StatisticTable;
