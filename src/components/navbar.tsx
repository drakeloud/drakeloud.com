import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import L from "../images/";

export default () => (
    <nav
        className="navbar container"
        role="navigation"
        aria-label="main navigation"
    >
        <div className="navbar-brand">
            <a className="navbar-item logo" href="/">
                DRAKE LOUD
            </a>

            <a
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
            >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
            </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
                <a href="/" className="navbar-item">
                    {/* <FontAwesomeIcon icon={faHome} /> */}
                    Home
                </a>
                <a href="#" className="navbar-item">
                    Design Pattern Library
                </a>
                <a href="/blog" className="navbar-item">
                    Blog
                </a>
            </div>
        </div>
    </nav>
);
