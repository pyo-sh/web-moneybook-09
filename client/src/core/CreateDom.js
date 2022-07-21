import { isElement, isNode, isString, isObject } from "@utils/validation.js";

const createDom = (tagName) => {
    const element = document.createElement(tagName);

    return (...args) => {
        const appendChildren = (...children) => {
            children.forEach((child) => {
                if (isString(child)) {
                    child = document.createTextNode(child);
                }
                if (isElement(child) || isNode(child)) {
                    element.appendChild(child);
                }
            });
            return element;
        };

        if (isObject(args[0])) {
            const props = args[0];

            Object.entries(props).forEach(([key, val]) => {
                // key 에 event
                if (key === "event") {
                    return Object.entries(val).forEach((event) => {
                        element.addEventListener(...event);
                    });
                }

                // 아닐 때
                element.setAttribute(key, val);
            });

            // 인자가 object라면 children을 받을 수 있는 함수를 반환한다.
            return appendChildren;
        }

        // object가 아니라면 appendChildren()을 실행해서 반환한다.
        return appendChildren(...args);
    };
};

export default new Proxy(
    {},
    {
        get(target, property) {
            property = property.toLowerCase();
            if (property in target) return Reflect.get(...arguments);

            Reflect.set(target, property, createDom(property));
            return Reflect.get(...arguments);
        },
        set() {
            return false;
        },
    },
);
