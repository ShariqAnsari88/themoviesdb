import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getGenres } from "../../store/homeSlice";
import { fetchDataFromApi } from "../../utils/api";

import "./style.scss";

const Genres = ({ data }) => {
    const dispatch = useDispatch();
    const { genres } = useSelector((state) => state.home);

    useEffect(() => {
        parallelCall();
    }, []);

    const parallelCall = async () => {
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
        <div className="genres">
            {data?.map((g) => {
                if (!genres[g]?.name) return;
                return (
                    <div key={g} className="genre">
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;
