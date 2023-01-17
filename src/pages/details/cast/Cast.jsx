import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                <div className="listItems">
                    {data?.map((item) => {
                        if (!item.profile_path) return;
                        return (
                            <div key={item.id} className="listItem">
                                <div className="profileImg">
                                    <img
                                        src={url.profile + item.profile_path}
                                        alt=""
                                    />
                                </div>
                                <div className="name">{item.name}</div>
                                <div className="character">
                                    {item.character}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ContentWrapper>
        </div>
    );
};

export default Cast;
