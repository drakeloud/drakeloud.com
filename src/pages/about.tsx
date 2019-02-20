import React from "react";
import Layout from "../components/layout";

export default () => (
    <Layout>
        <div className="">
            <section className="hero is-primary is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">About</h1>
                        <h2 className="subtitle">A test subtitle</h2>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div>This is the content</div>
                </div>
            </section>
        </div>
    </Layout>
);
