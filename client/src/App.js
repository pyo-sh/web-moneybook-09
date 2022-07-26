import Component from "@core/Component";
import "@src/App.css";
import { div } from "@core/CreateDom";
import { pageState, Routes } from "@core/Route";
import Header from "@components/Header";
import Account from "@pages/Account";
import Calendar from "@pages/Calendar";
import Statistic from "@pages/Statistic";
import controlDate from "@store/controlDate";
import histories from "@store/histories";

export default class App extends Component {
    bindState() {
        return [pageState, controlDate.state, histories.state];
    }

    render() {
        return div({
            id: "root",
        })(
            new Header(),
            div({ class: "appContainer" })(
                Routes({ Component: Account, path: "/" }),
                Routes({ Component: Calendar, path: "/calendar" }),
                Routes({ Component: Statistic, path: "/statistic" }),
            ),
        );
    }
}
