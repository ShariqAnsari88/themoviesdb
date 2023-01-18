import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getPopular, getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        fetchApiConfig();
        fetchPopular();
        genresCall();
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
                profile: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                backdrop: res.images.secure_base_url + "original",
            };
            dispatch(getApiConfiguration(url));
        });
    };

    const genresCall = async () => {
        let promises = [];
        let endPoints = ["movie", "tv"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
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
