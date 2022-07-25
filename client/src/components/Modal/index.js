import "./modal.css";
import Component from "@core/Component";
import { div } from "@core/CreateDom";
import { modalState } from "@store/modalState";
import CategoryDeleteForm from "./CategoryDeleteForm";
import CategoryAddForm from "./CategoryAddForm";

const modalMap = {
    delete: CategoryDeleteForm,
    add: CategoryAddForm,
};

export default class Modal extends Component {
    bindState() {
        return [modalState];
    }

    render() {
        const { value, type } = modalState;

        if (!type) {
            return div();
        }

        return div({ class: "modalContainer" })(
            div({ class: "blackScreen" })(),
            div({ class: "modalWrapper" })(modalMap[type](value)),
        );
    }
}
