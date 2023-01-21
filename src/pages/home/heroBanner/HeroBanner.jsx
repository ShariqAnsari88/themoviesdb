import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import useFetch from "../../../hooks/useFetch";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        const bg =
            url.backdrop +
            data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    const searchQueryHandler = (event) => {
        if (event?.key === "Enter" && query?.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer" />
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={(e) => searchQueryHandler(e)}
                        />
                        <button onClick={() => navigate(`/search/${query}`)}>
                            Search
                        </button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
