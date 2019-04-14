import React from "react";
import * as navCss from "./navbar.module.scss";

interface NavProps {}

interface NavState {
    isActive: boolean;
}

export default class Navbar extends React.Component<NavProps, NavState> {
    constructor(props: NavProps) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isActive: false
        };
    }

    toggleNav() {
        this.setState({ isActive: !this.state.isActive });
    }

    public render() {
        return (
            <nav
                className={`navbar container`}
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
                        onClick={this.toggleNav}
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </a>
                </div>
                <div
                    className={`navbar-menu ${
                        this.state.isActive ? "is-active" : ""
                    }`}
                >
                    {/* <div className="navbar-menu "> */}
                    <div className="navbar-end">
                        <a href="/" className="navbar-item">
                            {/* <FontAwesomeIcon icon={faHome} /> */}
                            Home
                        </a>
                        {/* <a href="/design-pattern-library" className="navbar-item">
                        Design Pattern Library
                        </a> */}
                        <a href="/blog" className="navbar-item">
                            Blog
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}
