import Component from "@core/Component";
import { section } from "@core/CreateDom";
import "./Statistic.css";
import PaymentReport from "@components/PaymentReport";

export default class Statistic extends Component {
    getSum() {}

    render() {
        return section({ class: "statisticWrapper" })(new PaymentReport());
    }
}
