export default { makeObservable, subscribe } = (function () {
    const observerMap = new Map();

    function makeObservable(state) {
        const observable = new Proxy(state, {
            set(target, property, value) {
                const handlerSet = observerMap.get(observable);
                const isChange = target[property] !== value;

                if (!(handlerSet && isChange)) {
                    return false;
                }

                handlerSet.forEach((handler) => handler());
                target[property] = value;
                return true;
            },
        });
        return observable;
    }

    function subscribe(state, handler) {
        const handlerSet = observerMap.get(state);

        if (handlerSet) {
            handlerSet.add(handler);
        } else {
            observerMap.set(state, new Set([handler]));
        }
    }

    return { makeObservable, subscribe };
})();
