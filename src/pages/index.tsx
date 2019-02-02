import React from "react";
import { Link, graphql } from "gatsby";
import "./index.module.scss";
import Layout from "../components/layout";

export default class IndexPage extends React.Component<{}, {}> {
    public render() {
        return (
            <body>
                <div className="home-main" />
                <h1>Some content</h1>
            </body>

            // <Layout>
            //     <h1>Hello world</h1>
            // </Layout>
        );
    }
}
