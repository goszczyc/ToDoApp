import { SERVER_ADD } from "../config";

const apiRequest = async (url: string, options: RequestInit = {}) => {
    return fetch(SERVER_ADD + url, {
        ...options,
        credentials: "include", // Automatically include credentials
        headers: {
            ...options.headers, // Merge any additional headers
        },
    });
};

export default apiRequest;
