import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";

const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""}`}>
            <ContentWrapper>
                <div className="logo">
                    <img
                        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                        alt=""
                    />
                </div>

                <ul className="menuItems">
                    <li className="menuItem">Movies</li>
                    <li className="menuItem">TV Shows</li>
                    <li className="menuItem">People</li>
                    <li className="menuItem">More</li>
                    <li className="menuItem">
                        <HiOutlineSearch />
                    </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={() => setMobileMenu(true)} />
                    )}
                </div>
            </ContentWrapper>
        </header>
    );
};

export default Header;
