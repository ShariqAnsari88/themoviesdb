import React from "react";

import HeroBanner from "./heroBanner/HeroBanner";
import Popular from "./popular/Popular";
import Trending from "./trending/Trending";

import "./style.scss";

const Home = () => {
    return (
        <div>
            <HeroBanner />
            <Popular />
            <Trending />
        </div>
    );
};

export default Home;
