import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getPopular, getApiConfiguration } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchApiConfig();
        fetchPopular();
    }, []);

    const fetchPopular = () => {
        fetchDataFromApi("/movie/popular").then((res) => {
            console.log(res);
            dispatch(getPopular(res.results));
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
                <Route path="/:mediaType/:id" element={<Details />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
