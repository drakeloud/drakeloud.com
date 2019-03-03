import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitterSquare,
    faGithubSquare,
    faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import * as layoutCss from "./layout.module.scss";

import Helmet from "react-helmet";
import Navbar from "../components/navbar";

export default ({ children }: any) => (
    <div className="">
        <Helmet />
        <Navbar />
        <div>{children}</div>
        <footer className="footer">
            <div className="container">
                <div className="has-text-centered">
                    <p className="">
                        Drake Loud - &copy; {new Date().getFullYear()}
                    </p>
                </div>
                {console.log(layoutCss)}
                <div className={`has-text-centered ${layoutCss.socialIcons}`}>
                    <a href="https://github.com/drakeloud">
                        <FontAwesomeIcon icon={faGithubSquare} />
                    </a>
                    <a href="https://www.linkedin.com/in/drakeloud">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="https://twitter.com/drakeloud">
                        <FontAwesomeIcon icon={faTwitterSquare} />
                    </a>
                </div>
            </div>
        </footer>
    </div>
);
