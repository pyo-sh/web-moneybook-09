import { button, div, form, ul } from "@core/CreateDom";

const CategoryDeleteForm = (value) => {
    return form({ class: "modal text_body_medium " })(
        div({ class: "info" })("해당 결제수단을 삭제하시겠습니까?"),
        div({ class: "modalInput text_body_medium", placeholder: "입력하세요" })(value),
        ul({ class: "modalBtnWrapper" })(
            button({ class: "text_body_medium modalBtn " })("취소"),
            button({ type: "button", class: "modalBtn text_body_medium error" })("삭제"),
        ),
    );
};

export default CategoryDeleteForm;
