import { button, div, form, input, ul } from "@core/CreateDom";

const CategoryAddForm = () => {
    return form({ class: "modal text_body_medium " })(
        div({ class: "info" })("추가하실 결제수단을 적어주세요."),
        input({ class: "modalInput text_body_medium", placeholder: "입력하세요" })(),
        ul({ class: "modalBtnWrapper" })(
            button({ class: "text_body_medium modalBtn " })("취소"),
            button({ type: "button", class: "modalBtn text_body_medium primary" })("등록"),
        ),
    );
};

export default CategoryAddForm;
