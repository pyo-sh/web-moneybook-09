import Component from "@core/Component";
import "@components/History/index.css";
import { div } from "@core/CreateDom";
import HistorySummary from "@components/History/Summary";
import HistoryDetail from "@components/History/Details";
import histories from "@store/histories";

export default class History extends Component {
    initState() {
        return {
            isIncomeSelected: true,
            isPaidSelected: true,
        };
    }
    render() {
        const { isIncomeSelected, isPaidSelected } = this.state;
        const filteredHistories = histories.getFilteredHistories(this.state);
        // prettier-ignore
        return div({ class: "History" })(
            new HistorySummary({
                filteredHistories,
                isIncomeSelected,
                isPaidSelected
            }),
            new HistoryDetail({
                filteredHistories,
                showTotal: true
            }),
        );
    }
}
