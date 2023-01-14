import React from "react";
import { useSelector } from "react-redux";

import HeroBanner from "./heroBanner/HeroBanner";
import Carousel from "../../components/carousel/Carousel";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../components/switchTabs/SwitchTabs";

import "./style.scss";

const Home = () => {
    const { url, popularMovies } = useSelector((state) => state.home);
    return (
        <div>
            <HeroBanner />
            <div className="popularMoviesSection">
                <ContentWrapper>
                    <span className="carouselTitle">What's Popular</span>
                    <SwitchTabs
                        data={["Movies", "TV Shows"]}
                        onTabChange={(tab, index) => console.log(tab, index)}
                    />
                </ContentWrapper>
                <Carousel data={popularMovies} />
            </div>
        </div>
    );
};

export default Home;
