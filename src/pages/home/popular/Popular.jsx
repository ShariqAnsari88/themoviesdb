import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

const CarouselSection = () => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading, error } = useFetch(`/${endpoint}/popular`);

    const onTabChange = (tab, index) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };
    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
                <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>
            <Carousel data={data} loading={loading} />
        </div>
    );
};

export default CarouselSection;
