import { div, span } from "@core/CreateDom";
import { downArrowIcon } from "@icons";

const getCategories = (isIncome) => {
    return isIncome
        ? ["월급", "용돈", "기타수입"]
        : ["생활", "식비", "교통", "쇼핑/뷰티", "의료/건강", "문화/여가", "미분류"];
};

const CategoryDropdownPanel = ({ state, ref, categories }) => {
    const panelItem = (value) => {
        const setCategory = (e) => {
            e.stopPropagation();
            ref.category = value;
            state.isCategoryClick = false;
            e.currentTarget.dispatchEvent(new Event("validate", { bubbles: true }));
        };

        return div({ class: "panelItemContainer" })(
            div({
                class: "panelItem",
                event: { click: setCategory },
            })(span(value)),
        );
    };
    // prettier-ignore
    return div({ class: "dropdownPanel" })(
        ...categories.map((category) => panelItem(category)));
};

const CategoryDropdown = ({ state, ref }) => {
    const toggleIsClick = ({ currentTarget }) => {
        state.isCategoryClick = !state.isCategoryClick;
    };
    // 나중에 분리
    const categories = getCategories(state.isIncome);

    return div({ class: "inputBox" })(
        div({ class: "inputItem category", event: { click: toggleIsClick } })(
            div({ class: "text_bold_small label", role: "label" })("분류"),
            div({ class: "text_body_regular dropdown" })(
                span({ class: `dropdownInput ${ref.category ? "active" : ""}` })(
                    `${ref.category ?? "선택하세요"}`,
                ),
                span({ class: "smallIcon" })(downArrowIcon()),
            ),
            state.isCategoryClick && CategoryDropdownPanel({ state, ref, categories }),
        ),
    );
};

export default CategoryDropdown;
