import Component from "@core/Component";
import AccountForm from "@src/components/AccountForm";
import Modal from "@components/Modal";
import { div } from "@core/CreateDom";
import History from "@components/History";

export default class Account extends Component {
    render() {
        // prettier-ignore
        return div(
                new AccountForm(),
                new Modal(),
                new History(),
        );
    }
}
