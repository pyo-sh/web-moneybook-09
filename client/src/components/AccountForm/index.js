import "./accountForm.css";
import Component from "@core/Component";
import { button, form } from "@core/CreateDom";
import { checkIcon } from "@icons";
import FormInput from "./FormInput";
import CategoryDropdown from "./CategoryDropdown";
import PaymentDropdown from "./paymentDropdown";
import AmountInput from "./AmountInput";
import { validateHistoryForm, validateDate, formatDate } from "./validation";
import { SelectedHistoryState } from "@store/";
import { compareObjects } from "@utils/compareObject";

// 내용 150;;
const ACTIVE_COLOR = "white";
const PRIMARY_COLOR = "#2ac1bc";

export default class AccountForm extends Component {
    initState() {
        return {
            isCategoryClick: false,
            isPaymentClick: false,
            isIncome: false,
            isAllValid: false,
        };
    }

    initRef() {
        return {
            isAllValid: false,
            date: "2020.05.04", // 전역 date로 대체
            content: null,
            paymentMethod: null,
            amount: null,
            id: null,
        };
    }

    activateSubmitBtn(isAllValid) {
        this.ref.isAllValid = isAllValid;
        const saveBtn = document.querySelector(".saveButton");
        saveBtn.classList.toggle("active", isAllValid);
        saveBtn.querySelector("svg").style.stroke = isAllValid ? ACTIVE_COLOR : PRIMARY_COLOR;
    }

    validateAll() {
        const innerInputValues = { ...this.ref, isIncome: this.state.isIncome };
        const isNotChanged = compareObjects(innerInputValues, SelectedHistoryState);

        if (isNotChanged) {
            return;
        }

        const isAllValid = validateHistoryForm(innerInputValues);
        this.activateSubmitBtn(isAllValid);
    }

    render() {
        const { ref, state } = this;

        // prettier-ignore
        return form({ class: "accountForm", event: {validate: this.validateAll.bind(this) ,submit: (e)=>{
            e.preventDefault();
            this.validateAll();} }})(
            FormInput({ref, key:"date",placeholder: "2022.07.01", labelText : "일자" , maxlength:10, validate: validateDate, format:formatDate}),
            CategoryDropdown({ref, state}),
            FormInput({ref, key:"content" , placeholder: "입력하세요", labelText : "내용"}),
            PaymentDropdown({ref, state}),
            AmountInput({ref,state}),
            button({class:`saveButton ${this.ref.isAllValid && "active"} `})(
                checkIcon(this.ref.isAllValid ? ACTIVE_COLOR : PRIMARY_COLOR )
            )
        );
    }
}
