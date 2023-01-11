import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const params = {
    headers: {
        Authorization: "bearer " + TMDB_TOKEN,
    },
};

export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(BASE_URL + url, params);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const makePaymentRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: "bearer " + TMDB_TOKEN,
    },
});
