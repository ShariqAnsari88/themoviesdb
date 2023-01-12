import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const { url, popularMovies } = useSelector((state) => state.home);

    return (
        <div className="heroBanner">
            <div
                className="backdrop-img"
                style={{
                    backgroundImage: `url('${
                        url.backdrop +
                        popularMovies[Math.floor(Math.random() * 20)]
                            ?.backdrop_path
                    }')`,
                }}
            />
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
                            placeholder="Search for a movie, tv show, person......"
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
