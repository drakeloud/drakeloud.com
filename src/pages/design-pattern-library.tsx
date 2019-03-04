import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import * as dplCss from "./design-pattern-library.module.scss";

export default class BlogPostTemplate extends React.Component<{}, {}> {
    render() {
        return (
            <Layout>
                <section className={`${dplCss.mainContent}`}>
                    <div className="container">
                        <div className="columns content">
                            <div className="column is-two-thirds">
                                <div className={``}>
                                    <h1 className="is-size-2 title has-text-primary">
                                        Coming soon!
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }
}
