import React from "react";
import { useSelector } from "react-redux";

import HeroBanner from "./heroBanner/HeroBanner";
import Carousel from "../../components/carousel/Carousel";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import "./style.scss";

const Home = () => {
    const { url, popularMovies } = useSelector((state) => state.home);
    return (
        <div>
            <HeroBanner />
            <div className="popularMoviesSection">
                <ContentWrapper>
                    <span className="carouselTitle">Popular Movies</span>
                    {/* <div className="switchingTabs">
                        <span className="tabItem">Movies</span>
                        <span className="tabItem">TV Shows</span>
                    </div> */}
                </ContentWrapper>
                <Carousel data={popularMovies} />
            </div>
        </div>
    );
};

export default Home;
