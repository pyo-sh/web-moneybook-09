import { div, button, span } from "@core/CreateDom";
import { xIcon, downArrowIcon } from "@icons";
import { ModalState } from "@store/";

const paymentMethods = ["현금", "체크카드", "현대카드"];

const PaymentDropdownPanel = ({ state, ref, paymentMethods }) => {
    const openModal = (type, value = null) => {
        return (e) => {
            e.stopPropagation();
            ModalState.type = type;
            ModalState.value = value;
        };
    };

    const panelItem = (value) => {
        const setPaymentMethod = (e) => {
            e.stopPropagation();
            ref.paymentMethod = value;
            state.isPaymentMethodClick = false;
            e.currentTarget.dispatchEvent(new Event("validate", { bubbles: true }));
        };

        return div({ class: "panelItemContainer" })(
            div({
                class: "panelItem",
                event: { click: setPaymentMethod },
            })(span(value), span({ event: { click: openModal("delete", value) } })(xIcon())),
        );
    };

    return div({ class: "dropdownPanel" })(
        ...paymentMethods.map((paymentMethod) => panelItem(paymentMethod)),
        div({ class: "panelItemContainer" })(
            button({ event: { click: openModal("add") }, class: "panelItem" })("추가하기"),
        ),
    );
};

const PaymentDropdown = ({ state, ref }) => {
    const toggleIsClick = ({ currentTarget }) => {
        state.isPaymentMethodClick = !state.isPaymentMethodClick;
    };

    return div({ class: "inputBox payment" })(
        div({ class: "inputItem paymentMethod", event: { click: toggleIsClick } })(
            div({ class: "text_bold_small label", role: "label" })("결제수단"),
            div({ class: `text_body_regular dropdown` })(
                span({ class: `dropdownInput  ${ref.paymentMethod ? "active" : ""}` })(
                    `${ref.paymentMethod ?? "선택하세요"}`,
                ),
                span({ class: "smallIcon" })(downArrowIcon()),
            ),
            state.isPaymentMethodClick && PaymentDropdownPanel({ state, ref, paymentMethods }),
        ),
    );
};

export default PaymentDropdown;
