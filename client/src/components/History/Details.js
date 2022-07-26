import Component from "@core/Component";
import "@components/History/Details.css";
import { div, h4, lh, li, span, ul } from "@core/CreateDom";
import histories from "@store/histories";

export default class HistoryDetails extends Component {
    render() {
        const { filteredHistories, showTotal } = this.props;
        const groupedHistories = histories.groupHistoriesByDate(filteredHistories);
        const dates = Object.keys(groupedHistories).sort();

        const Details = dates.reduce((doms, date) => {
            const { histories: details, incomeTotal, paidTotal } = groupedHistories[date];
            doms.push(HistoryInfo({ date, incomeTotal, paidTotal, showTotal }));
            doms.push(...details.map(HistoryItem));
            return doms;
        }, []);
        // prettier-ignore
        return ul({ class: "HistoryDetail" })(
            ...Details
        );
    }
}

const HistoryInfo = ({ date, incomeTotal, paidTotal, showTotal }) => {
    const showIncome = showTotal && incomeTotal ? undefined : false;
    const showPaid = showTotal && paidTotal ? undefined : false;
    // prettier-ignore
    return lh(
        h4(date),
        div(
            showIncome ?? span("수입"),
            showIncome ?? span(incomeTotal),
            showPaid ?? span("지출"),
            showPaid ?? span(paidTotal),
        ),
    );
};

const HistoryItem = ({ category, content, paymentMethod, amount, isIncome }) => {
    // prettier-ignore
    return li(
        div(category),
        div(content),
        div(paymentMethod),
        div(amount * (isIncome ? 1 : -1)),
    );
};
