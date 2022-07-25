import Component from "@core/Component";
import AccountForm from "@src/components/AccountForm";
import Modal from "@components/Modal";
import { div } from "@core/CreateDom";
export default class Account extends Component {
    render() {
        console.log("Account Render");
        // prettier-ignore
        return div(
                new AccountForm(),
                new Modal()
        );
    }
}

// 2 가지 방법
// 따로 id를 만들거나 ,
// 엔트리 포인트를 그리거나
