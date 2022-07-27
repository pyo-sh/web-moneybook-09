import Component from "@core/Component";
import { div } from "@core/CreateDom";
import DoughnutChart from "@components/DoughnutChart";
import histories from "@store/histories";

export default class Statistic extends Component {
    getSum() {}

    render() {
        const historySumMap = histories.groupPaymentSumByCategory();

        if (!historySumMap) {
            return "";
        }

        const totalExpenditure = Object.values(historySumMap).reduce((prev, cur) => prev + cur, 0);

        return div(new DoughnutChart({ totalExpenditure, historySumMap }));
    }
}
