import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

const Explore = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const { mediaType } = useParams();

    const title = mediaType === "tv" ? "Explore TV Shows" : "Explore Movies";

    const fetchInitialData = () => {
        fetchDataFromApi(`/discover/${mediaType}`).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
        });
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        setData(null);
        setPageNum(1);
        fetchInitialData();
    }, [mediaType]);

    if (!data) return <Spinner initial={true} />;

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageTitle">{title}</div>
                <InfiniteScroll
                    className="content"
                    dataLength={data?.results?.length}
                    next={fetchNextPageData}
                    hasMore={pageNum <= data?.total_pages}
                    loader={<Spinner />}
                >
                    {data?.results?.map((item, index) => {
                        if (item.media_type === "person") return;
                        return (
                            <MovieCard
                                key={index}
                                data={item}
                                mediaType={mediaType}
                            />
                        );
                    })}
                </InfiniteScroll>
            </ContentWrapper>
        </div>
    );
};

export default Explore;
