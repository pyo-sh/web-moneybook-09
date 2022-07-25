import { div, label, button, input, span } from "@core/CreateDom";
import { formatAmount } from "./validation";

const AmountInput = ({ ref, state }) => {
    const toggleIsIncome = () => {
        ref.category = null;
        state.isIncome = !state.isIncome;
    };

    const transitionIcon = (e) => {
        e.stopPropagation();
        e.currentTarget.classList.toggle("form-payment-sign-plus", !state.isIncome);
    };

    const setAmount = ({ currentTarget }) => {
        currentTarget.value = formatAmount(currentTarget.value); //문자열
        ref.amount = currentTarget.value.replace(/,/g, "");
        currentTarget.dispatchEvent(new Event("validate", { bubbles: true }));
    };

    return div({ class: "inputBox" })(
        div({ class: "inputItem price" })(
            label({ class: "text_bold_small label" })("금액"),
            div({ class: `priceInputContainer` })(
                button({
                    type: "button",
                    class: `form-payment-sign ${state.isIncome ? "form-payment-sign-plus" : ""}`,
                    event: {
                        click: transitionIcon,
                        transitionend: toggleIsIncome,
                    },
                })(),
                input({
                    class: "text_body_regular",
                    placeholder: "입력하세요",
                    value: formatAmount(ref.amount) || "",
                    event: {
                        input: setAmount,
                    },
                })(),
                span("원"),
            ),
        ),
    );
};

export default AmountInput;
