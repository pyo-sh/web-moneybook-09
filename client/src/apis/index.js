export const API = {
    call: async function (api, ...args) {
        try {
            const { json, status } = await api(...args);
            if (status < 400) {
                return json;
            }
            throw new Error(json.message);
        } catch (error) {
            // TODO: Move To Error Page
        }
    },
};
