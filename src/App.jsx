import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";
import { getPopularMovies, getApiConfiguration } from "./store/homeSlice";

function App() {
    const apiConfig = useSelector((state) => state.home.apiConfiguration);
    const dispatch = useDispatch();

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
            dispatch(getApiConfiguration(res));
        });
    };

    return <div className="App">App</div>;
}

export default App;
