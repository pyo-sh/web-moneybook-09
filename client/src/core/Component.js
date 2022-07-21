import { makeObservable, subscribe } from "@core/Observer";
import { div } from "@core/CreateDom";

export default class Component {
    constructor(props) {
        this.state = makeObservable(this.initState());
        subscribe(this.state, this._render.bind(this));
        this.props = props;

        this._render();
    }

    initState() {
        return {};
    }

    beforeRender() {}
    afterRender() {}

    render() {
        return div();
    }
    _render() {
        this.beforeRender();
        this.element = this.render();
        this.afterRender();
    }
}
