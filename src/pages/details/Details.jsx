import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { PlayIcon } from "./playIcon.jsx";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import useFetch from "../../hooks/useFetch";
import Genres from "../../components/genres/Genres";
import CircleRating from "../../components/circleRating/CircleRating";

const Details = () => {
    const { mediaType, id } = useParams();
    const { url } = useSelector((state) => state.home);

    const { data, loading, error } = useFetch(`/${mediaType}/${id}`);

    if (!data) return;
    const _generes = data.genres.map((g) => g.id);
    return (
        <div>
            <div className="detailsBanner">
                <div
                    className="backdrop-img"
                    style={{
                        backgroundImage: `url('${
                            url.backdrop + data.backdrop_path
                        }')`,
                    }}
                />
                <div className="opacity-layer" />
                <ContentWrapper>
                    <div className="content">
                        <div className="left">
                            <img
                                className="posterImg"
                                src={url.backdrop + data.poster_path}
                                alt=""
                            />
                        </div>
                        <div className="right">
                            <div className="title">
                                {`${data.name || data.title} (${dayjs(
                                    data.release_date
                                ).format("YYYY")})`}
                            </div>
                            <div className="subtitle">{data.tagline}</div>
                            <Genres data={_generes} />
                            <div className="overview">
                                <div className="heading">Overview</div>
                                <div className="description">
                                    {data.overview}
                                </div>
                            </div>
                            <div className="row">
                                <CircleRating
                                    rating={data.vote_average.toFixed(1)}
                                />
                                <div className="playbtn">
                                    <PlayIcon />
                                    <span className="text">Watch Trailer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
            </div>
            <div style={{ height: 700 }}></div>
        </div>
    );
};

export default Details;
