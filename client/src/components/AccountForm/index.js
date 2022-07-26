import "./accountForm.css";
import Component from "@core/Component";
import { button, form } from "@core/CreateDom";
import { checkIcon } from "@icons";
import FormInput from "./FormInput";
import CategoryDropdown from "./CategoryDropdown";
import PaymentDropdown from "./paymentDropdown";
import AmountInput from "./AmountInput";
import { validateHistoryForm, validateDate } from "./validation";
import { formatDate } from "./format";
import { historyState } from "@store/historyState";
import { compareObjects } from "@utils/compareObject";

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

    bindState() {
        return [historyState];
    }

    initRef() {
        return {
            isAllValid: false,
            date: "2020.05.04", // 전역 date로 대체
            content: null,
            paymentMethod: null,
            category: null,
            id: null,
            amount: null,
        };
    }

    toggleActiveSubmitBtn(isAllValid) {
        this.ref.isAllValid = isAllValid;
        const saveBtn = document.querySelector(".saveButton");
        saveBtn.classList.toggle("active", isAllValid);
        saveBtn.querySelector("svg").style.stroke = isAllValid ? ACTIVE_COLOR : PRIMARY_COLOR;
    }

    validateAll() {
        const innerInputValues = { ...this.ref, isIncome: this.state.isIncome };
        const isNotChanged = compareObjects(innerInputValues, historyState);

        if (isNotChanged) {
            return this.toggleActiveSubmitBtn(false);
        }

        const isAllValid = validateHistoryForm(innerInputValues);
        this.toggleActiveSubmitBtn(isAllValid);
    }

    synchronize() {
        Object.keys(this.ref).forEach((key) => {
            if (historyState[key]) {
                this.ref[key] = historyState[key];
            }
        });
    }
    render() {
        const { ref, state } = this;

        if (historyState.isClick) {
            this.synchronize();
            this.validateAll();
            historyState.isClick = false;
        }

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
