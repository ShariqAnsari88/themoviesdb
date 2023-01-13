import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
    getPopularMovies,
    getApiConfiguration,
    getGenres,
} from "./store/homeSlice";

import Header from "./components/header/Header";
import Home from "./pages/home/Home";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchApiConfig();
        fetchPopularMovies();
        fetchGenres();
    }, []);

    const fetchPopularMovies = () => {
        fetchDataFromApi("/movie/popular").then((res) => {
            console.log(res);
            dispatch(getPopularMovies(res.results));
        });
    };

    const fetchGenres = () => {
        fetchDataFromApi("/genre/movie/list").then((res) => {
            console.log(res);
            let genres = {};
            res.genres.map((item) => (genres[item.id] = item));
            dispatch(getGenres(genres));
        });
    };

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {
            console.log(res);
            const url = {
                poster: res.images.base_url + "original",
                backdrop: res.images.base_url + "original",
            };
            dispatch(getApiConfiguration(url));
        });
    };

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
