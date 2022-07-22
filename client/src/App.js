import Component from "@core/Component";
import { div } from "@core/CreateDom";
import Header from "@components/Header";
import Main from "@pages/Main";
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
            Routes({ Component: Main, path: "/" }),
            Routes({ Component: Calendar, path: "/calendar" }),
            Routes({ Component: Statistic, path: "/statistic" }),
        );
    }
}
