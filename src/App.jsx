import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./utils/api";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getPopularMovies, getApiConfiguration } from "./store/homeSlice";
import useFetch from "./hooks/useFetch";

import Home from "./pages/home/Home";

function App() {
    const { url, popularMovies } = useSelector((state) => state.home);
    const dispatch = useDispatch();
    // const { data } = useFetch('/movie/popular');

    useEffect(() => {
        fetchApiConfig();
        fetchPopularProducts();
    }, []);

    const fetchPopularProducts = () => {
        fetchDataFromApi("/movie/popular").then((res) => {
            console.log(res);
            dispatch(getPopularMovies(res.results));
        });
    };

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {
            console.log(res);
            const url = {
                poster: res.images.base_url + res.images.poster_sizes[3],
                backdrop: res.images.base_url + res.images.backdrop_sizes[3],
            };
            dispatch(getApiConfiguration(url));
        });
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
