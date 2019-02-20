import React from "react";
import { Link } from "gatsby";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Helmet from "react-helmet";
import Navbar from "../components/navbar";

export default ({ children }: any) => (
    <div className="">
        <Helmet />
        <Navbar />
        <div>{children}</div>
        {/* <!-- Footer --> */}
        <div className="container">
            <div className="is-divider" data-content="OR" />

            <hr />

            <div className="">
                <p>&copy; {new Date().getFullYear()} - Drake Loud</p>
            </div>
        </div>
    </div>
);
