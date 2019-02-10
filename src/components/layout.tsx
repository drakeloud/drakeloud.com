import * as layoutStyles from "./layout.module.scss";
import React from "react";
import { Link } from "gatsby";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bulma/css/bulma.css";
import Helmet from "react-helmet";

export default ({ children }: any) => (
    <div className="">
        <Helmet />
        <div>{children}</div>
    </div>
);
