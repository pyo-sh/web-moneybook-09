import Component from "@core/Component";
import { div } from "@core/CreateDom";
import DoughnutChart from "@components/DoughnutChart";
import histories from "@store/histories";
import StatisticTable from "./StatisticTable";
import "./paymentReport.css";

export default class PaymentReport extends Component {
    render() {
        const historySumList = histories.groupPaymentSumByCategory();

        if (!historySumList) {
            return "";
        }

        const totalExpenditure = historySumList
            .map(([_, sum]) => sum)
            .reduce((prev, cur) => prev + cur, 0);

        return div({ class: "paymentReport" })(
            div({ class: "doughnutChartWrapper" })(
                new DoughnutChart({ totalExpenditure, historySumList }),
            ),
            StatisticTable({ totalExpenditure, historySumList }),
        );
    }
}
