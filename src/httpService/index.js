import axios from "axios";

class Actions {
    constructor() {

    }

    async get(url, data) {
        await axios.get(url)
        .then(data);
    }

    async post(url, data) {
        await axios.post(url, data);
    }

    async delete(url) {
        await axios.delete(url);
    }
}

export const Action = new Actions();