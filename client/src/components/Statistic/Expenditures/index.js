import Component from "@core/Component";
import { div } from "@core/CreateDom";
import "@components/Statistic/Expenditures/index.css";
import LineChart from "@components/Statistic/LineChart";
import recentSum from "@store/recentSum";

export default class StatisticExpenditure extends Component {
    bindState() {
        return [recentSum.state];
    }

    render() {
        if (recentSum.state.isLoading) {
            return div();
        }

        // prettier-ignore
        return div({ class: "statisticExpenditure" })(
            div({ class: "lineChart" })(
                new LineChart()
            ),
        );
    }
}
