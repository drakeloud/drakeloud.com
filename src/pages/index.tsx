import React from "react";
import { Link, graphql } from "gatsby";
import "./index.module.scss";
import Layout from "../components/layout";

export default class IndexPage extends React.Component<{}, {}> {
    public render() {
        return (
            <Layout>
                {/* <!-- Header --> */}
                <section className="hero is-link is-fullheight is-fullheight-with-navbar">
                    <div className="hero-body">
                        <div className="container">
                            Hello! I am
                            <h1 className="title is-1">Minion Tim</h1>
                            <h2 className="subtitle is-3">
                                Full Stack Web Developer
                            </h2>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }
}
