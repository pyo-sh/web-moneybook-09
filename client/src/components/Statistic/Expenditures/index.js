import Component from "@core/Component";
import { div } from "@core/CreateDom";
import "@components/Statistic/Expenditures/index.css";
import LineChart from "@components/Statistic/LineChart";

export default class StatisticExpenditure extends Component {
    render() {
        // prettier-ignore
        return div({ class: "statisticExpenditure" })(
            div({ class: "lineChart" })(
                new LineChart()
            ),
        );
    }
}
