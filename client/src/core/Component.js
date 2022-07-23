import { PROXY_SYMBOL, makeObservable, subscribe } from "@core/Observer";
import { isInDocument } from "@utils/validation";
import { div } from "@core/CreateDom";

export default class Component {
    constructor(props) {
        this.state = makeObservable(this.initState());
        this._subscribeState(this.state, ...this.bindState());
        this.props = props;

        this._render();

        return this.element;
    }

    initState() {
        return {};
    }
    bindState() {
        return [];
    }
    _subscribeState(...args) {
        const bindedRender = this._render.bind(this);
        args.forEach((state) => {
            if (state.prototype === PROXY_SYMBOL) {
                subscribe(state, bindedRender);
            }
        });
    }

    beforeRender() {}
    afterRender() {}

    render() {
        return div();
    }
    _render() {
        if (this?.element && !isInDocument(this.element)) {
            return false;
        }
        this.beforeRender();

        const newElement = this.render();
        if (this.element) {
            this.element.replaceWith(newElement);
        }
        this.element = newElement;

        this.afterRender();
        return true;
    }
}
