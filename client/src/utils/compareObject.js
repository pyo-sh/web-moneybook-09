/* eslint-disable no-prototype-builtins */
export const compareObjects = (object1, object2) => {
    for (const p in object1) {
        if (object1.hasOwnProperty(p)) {
            if (object1[p] !== object2[p]) {
                return false;
            }
        }
    }

    for (const p in object2) {
        if (object2.hasOwnProperty(p)) {
            if (object1[p] !== object2[p]) {
                return false;
            }
        }
    }
    return true;
};
