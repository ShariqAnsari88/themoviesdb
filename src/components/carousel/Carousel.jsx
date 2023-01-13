import React from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";

const Carousel = ({ data, title }) => {
    const { url } = useSelector((state) => state.home);

    const navigation = (dir) => {
        const container = document.querySelector(".carouselItems");

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                <div className="carouselItems">
                    {data.map((item) => (
                        <div key={item.id} className="carouselItem">
                            <div
                                className="posterBlock"
                                style={{
                                    backgroundImage: `url('${
                                        url.poster + item.poster_path
                                    }')`,
                                }}
                            >
                                <CircleRating rating={item.vote_average} />
                                <Genres data={item.genre_ids.slice(0, 2)} />
                            </div>
                            <div className="textBlock">
                                <span className="title">{item.title}</span>
                                <span className="date">
                                    {dayjs(item.release_date).format(
                                        "MMM D, YYYY"
                                    )}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </ContentWrapper>
        </div>
    );
};

export default Carousel;
