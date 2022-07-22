export const { makeObservable, subscribe } = (function () {
    const observerMap = new Map();

    function makeObservable(state) {
        return new Proxy(state, {
            set(target, property, value, receiver) {
                const handlerSet = observerMap.get(receiver);
                const isChange = target[property] !== value;

                if (!(handlerSet && isChange)) {
                    return true;
                }

                handlerSet.forEach((handler) => handler());
                Reflect.set(...arguments);
                return true;
            },
        });
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
