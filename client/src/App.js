import "./GlobalStyle.css";
import Component from "@core/Component";
import { div } from "@core/CreateDom";
import Header from "@components/Header";
import Account from "@src/pages/Account";
import Calendar from "@pages/Calendar";
import Statistic from "@pages/Statistic";
import { pageState, Routes } from "@core/Route";

export default class App extends Component {
    bindState() {
        return [pageState];
    }

    render() {
        return div({
            id: "root",
        })(
            new Header(),
            Routes({ Component: Account, path: "/" }),
            Routes({ Component: Calendar, path: "/calendar" }),
            Routes({ Component: Statistic, path: "/statistic" }),
        );
    }
}
