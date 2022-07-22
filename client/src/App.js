import Component from "@core/Component";
import { div } from "@core/CreateDom";
import Header from "@components/Header";

export default class App extends Component {
    render() {
        return div({ id: "root" })(new Header());
    }
}
