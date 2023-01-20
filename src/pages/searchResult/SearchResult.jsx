import React from "react";
import { useParams } from "react-router-dom";

import "./style.scss";

import useFetch from "../../hooks/useFetch";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";

const SearchResult = () => {
    const { query } = useParams();

    const { data, loading } = useFetch(`/search/multi?query=${query}`);

    return (
        <div className="searchResultsPage">
            <ContentWrapper>
                <div className="pageTitle">
                    Found {data?.total_results} search{" "}
                    {data?.total_results > 1 ? "results" : "result"}
                </div>
                <div className="content">
                    {data?.results.map((item, index) => {
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
