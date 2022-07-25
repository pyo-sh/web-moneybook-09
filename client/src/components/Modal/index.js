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
        console.log("modal");
        const { value, type } = ModalState;
        // prettier-ignore
        return  type ? (div({class:"modalContainer"})(
            div({class:"blackScreen"})(),
            div({class:"modalWrapper"})(
                modalMap[type](value)    
            ))
        ) :div();
    }
}
