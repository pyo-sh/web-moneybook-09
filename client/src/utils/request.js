const { protocol, hostname } = window.location;
const BASE_URL = `${protocol}//${hostname}:${3000}/api`;

const customFetch =
    (method) =>
    async ({ url, query, body = {}, headerOptions, options }) => {
        const query_string = query
            ? `?${Object.entries(query)
                  .reduce((prev, [key, value]) => [...prev, `${key}=${value}`], [])
                  .join("&")}
            `
            : "";

        const init = {
            ...(options ?? {}),
            method,
            headers: {
                ...(headerOptions ?? { "Content-Type": "application/json" }),
            },
        };

        if (method !== "GET") {
            if (body.toString() === "[object FormData]") {
                init.body = body;
            } else {
                init.body = JSON.stringify(body);
            }
        }

        const response = await fetch(`${BASE_URL}${url}${query_string}`, init);

        const { status } = response;
        if (!status) {
            return response;
        }

        const json = await response.json();
        return { json, status };
    };

const request = {
    get: customFetch("GET"),
    post: customFetch("POST"),
    patch: customFetch("PATCH"),
    delete: customFetch("DELETE"),
};

export default request;
