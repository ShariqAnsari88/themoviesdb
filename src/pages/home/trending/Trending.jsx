import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

const CarouselSection = () => {
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading, error } = useFetch(`/trending/all/${endpoint}`);

    const onTabChange = (tab, index) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data} loading={loading} />
        </div>
    );
};

export default CarouselSection;
