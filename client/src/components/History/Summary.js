import Component from "@core/Component";
import "@components/History/Summary.css";
import { button, div, h3, section, span } from "@core/CreateDom";
import histories from "@store/histories";

export default class HistorySummary extends Component {
    render() {
        const { filteredHistories } = this.props;
        const [incomeTotal, paidTotal] = histories.getTotals();
        // prettier-ignore
        return div({ class: "HistorySummary" })(
            h3(`전체 내역 ${filteredHistories?.length ?? 0}건`),
            section(
                div(
                    button("체크"),
                    span(`수입 ${incomeTotal}`),
                ),
                div(
                    button("체크"),
                    span(`지출 ${paidTotal}`),
                )
            )
        );
    }
}
