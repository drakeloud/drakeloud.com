import React from "react";
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
                    Home
                </a>
                <a href="/blog" className="navbar-item">
                    Blog
                </a>
                <a href="/about" className="navbar-item">
                    About
                </a>
            </div>
        </div>
    </nav>
);
