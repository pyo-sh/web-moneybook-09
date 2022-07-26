import Component from "@core/Component";
import AccountForm from "@src/components/AccountForm";
import Modal from "@components/Modal";
import { div } from "@core/CreateDom";
import selectedHistory from "@store/selectedHistory";
export default class Account extends Component {
    render() {
        // prettier-ignore
        return div(
                new AccountForm(),
                new Modal(),
                div({event:{click:()=>{
                    selectedHistory.state.date= "2020.07.02",
                    selectedHistory.state.category= "느와르",
                    selectedHistory.state.content= "안녕",
                    selectedHistory.state.paymentMethod= "신용카드",
                    selectedHistory.state.amount= "1000", //모두 문자열로
                    selectedHistory.state.id= 2,
                    selectedHistory.state.isIncome= false;
                    selectedHistory.state.isChanged = true;
                } 
                }})("이거 누르면 변함")
        );
    }
}

// 2 가지 방법
// 따로 id를 만들거나 ,
// 엔트리 포인트를 그리거나
