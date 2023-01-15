import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import { menuData } from "./menuData";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", controlNavbar);
            return () => {
                window.removeEventListener("scroll", controlNavbar);
            };
        }
    }, [lastScrollY]);

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo">
                    <img
                        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                        alt=""
                    />
                </div>

                <ul className="menuItems">
                    {menuData.map((menu) => {
                        return (
                            <li key={menu.id} className="menuItem">
                                {menu.name}
                                {menu.subMenu && (
                                    <div className="subMenu">
                                        {menu.subMenu.map((subMenu) => (
                                            <div
                                                key={subMenu.id}
                                                className="subMenuItem"
                                            >
                                                {subMenu.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </li>
                        );
                    })}
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
