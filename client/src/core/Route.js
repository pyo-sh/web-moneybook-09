import { makeObservable } from "@core/Observer";
import { getPageFromPath } from "@utils/stringUtils";

export const pageState = makeObservable({
    page: getPageFromPath(window.location.pathname),
});
export const pageList = new Map();

const Route = {
    push(page) {
        if (pageState !== page) {
            history.pushState(null, null, page);
            pageState.page = page;
        } else {
            history.replaceState(null, null, page);
        }
    },
    pop() {
        pageState.page = getPageFromPath(window.location.pathname);
    },
};
window.onpopstate = Route.pop;

export const Routes = ({ Component, path }) => {
    if (!Component) return null;
    if (`/${pageState.page}` === path) return new Component();
    return null;
};

export default Route;
