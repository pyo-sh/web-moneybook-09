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
    toggleSelected({ target }) {
        const button = target.closest(".toggleButton");
        if (!button) {
            return false;
        }
        const { id } = button;

        if (id === "incomeToggle") {
            this.state.isIncomeSelected = !this.state.isIncomeSelected;
        }
        if (id === "paidToggle") {
            this.state.isPaidSelected = !this.state.isPaidSelected;
        }
    }
    render() {
        const { isIncomeSelected, isPaidSelected } = this.state;
        const toggleSelected = this.toggleSelected.bind(this);
        const filteredHistories = histories.getFilteredHistories(this.state);
        // prettier-ignore
        return div({ class: "History" })(
            new HistorySummary({
                filteredHistories,
                isIncomeSelected,
                isPaidSelected,
                toggleSelected,
            }),
            new HistoryDetail({
                filteredHistories,
                showTotal: true,
            }),
        );
    }
}
