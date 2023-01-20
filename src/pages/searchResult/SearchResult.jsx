import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";

let fetching = false;
let total_pages = null;
let page_num = 1;

const SearchResult = () => {
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const { query } = useParams();

    const fetchData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${page_num}`).then(
            (res) => {
                page_num++;
                total_pages = res.total_pages;
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setIsFetching(false);
            }
        );
    };

    useEffect(() => {
        fetchData();
        document.addEventListener("scroll", scrollReachedToBottom);
        return () => {
            document.removeEventListener("scroll", scrollReachedToBottom);
        };
    }, []);

    const scrollReachedToBottom = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        )
            return;

        console.log("bottom");
        if (page_num <= total_pages) {
            setIsFetching(true);
        }
    };

    useEffect(() => {
        if (!isFetching) return;
        fetchData();
    }, [isFetching]);

    return (
        <div className="searchResultsPage">
            <ContentWrapper>
                <div className="pageTitle">
                    {`Found ${data?.total_results} search ${
                        data?.total_results > 1 ? "results" : "result"
                    } of '${query}'`}
                </div>
                <div className="content">
                    {data?.results?.map((item, index) => {
                        if (item.media_type === "person") return;
                        return (
                            <MovieCard
                                key={index}
                                data={item}
                                fromSearch={true}
                            />
                        );
                    })}
                </div>
            </ContentWrapper>
        </div>
    );
};

export default SearchResult;
