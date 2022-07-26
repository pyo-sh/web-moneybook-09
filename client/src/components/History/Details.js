import Component from "@core/Component";
import "@components/History/Details.css";
import { div, h4, lh, li, span, ul } from "@core/CreateDom";
import histories from "@store/histories";
import { getLocaleDate } from "@utils/date";

export default class HistoryDetails extends Component {
    render() {
        const { filteredHistories, showTotal } = this.props;
        const groupedHistories = histories.groupHistoriesByDate(filteredHistories);
        const dates = Object.keys(groupedHistories).sort().reverse();

        const Details = dates.reduce((doms, date) => {
            const { histories: details, incomeTotal, paidTotal } = groupedHistories[date];
            doms.push(HistoryInfo({ date, incomeTotal, paidTotal, showTotal }));
            doms.push(...details.map(HistoryItem));
            return doms;
        }, []);
        // prettier-ignore
        return ul({ class: "historyDetail" })(
            ...Details
        );
    }
}

const HistoryInfo = ({ date, incomeTotal, paidTotal, showTotal }) => {
    const showIncome = showTotal && incomeTotal ? undefined : false;
    const showPaid = showTotal && paidTotal ? undefined : false;

    const [localDate, day] = getLocaleDate(date);
    // prettier-ignore
    return lh({ class: "info text_bold_medium" })(
        h4(
            span({ class: "infoLocaleDate" })(localDate),
            span({ class: "infoDay" })(day),
        ),
        div({ class: "totals" })(
            showIncome ?? span("수입"),
            showIncome ?? span(incomeTotal),
            showPaid ?? span("지출"),
            showPaid ?? span(paidTotal),
        ),
    );
};

const HistoryItem = ({ category, content, paymentMethod, amount, isIncome }) => {
    // prettier-ignore
    return li({ class: "item text_body_medium" })(
        div({
            style: `background-color: ${""}`,
            class: "itemCategory text_bold_medium",
        })(category),
        div({ class: "itemContent" })(content),
        div({ class: "itemPaymentMethod" })(paymentMethod),
        div({ class: "itemAmount" })(`${amount * (isIncome ? 1 : -1)}원`),
    );
};
