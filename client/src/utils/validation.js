import Component from "@core/Component";

export const isElement = (arg) => {
    return arg instanceof HTMLElement;
};

export const isNode = (arg) => {
    return arg instanceof Node;
};

export const isString = (arg) => {
    return typeof arg === "string";
};

export const isObject = (arg) => {
    if (!arg) return false;
    return Object.getPrototypeOf(arg) === Object.prototype;
};

export const isComponent = (arg) => {
    if (!arg) return false;
    return arg instanceof Component;
};
