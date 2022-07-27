import Component from "@core/Component";
import { section } from "@core/CreateDom";
import DoughnutChart from "@components/DoughnutChart";
import histories from "@store/histories";
import "./Statistic.css";
export default class Statistic extends Component {
    getSum() {}

    render() {
        const historySumMap = histories.groupPaymentSumByCategory();

        if (!historySumMap) {
            return "";
        }

        const totalExpenditure = Object.values(historySumMap).reduce((prev, cur) => prev + cur, 0);

        return section({ class: "statistic" })(
            new DoughnutChart({ totalExpenditure, historySumMap }),
        );
    }
}
