import "./modal.css";
import Component from "@core/Component";
import { div } from "@core/CreateDom";
import { ModalState } from "@store/";
import CategoryDeleteForm from "./CategoryDeleteForm";
import CategoryAddForm from "./CategoryAddForm";

const modalMap = {
    delete: CategoryDeleteForm,
    add: CategoryAddForm,
};

export default class Modal extends Component {
    bindState() {
        return [ModalState];
    }

    render() {
        const { value, type } = ModalState;

        if (!type) {
            return div();
        }

        return div({ class: "modalContainer" })(
            div({ class: "blackScreen" })(),
            div({ class: "modalWrapper" })(modalMap[type](value)),
        );
    }
}
