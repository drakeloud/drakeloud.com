import React from "react";
import { Link, graphql } from "gatsby";
import * as indexCss from "./index.module.scss";
import Layout from "../components/layout";
import tsLogo from "../images/typescript.png";

interface Post {
    id: string;
    title: string;
    mainImage: {
        resolutions: {
            src: string;
        };
    };
    slug: string;
    postedDate: string;
    createdAt: string;
}
interface IndexProps {
    data: {
        site: {
            siteMetadata: {
                name: string;
                tagline: string;
                githubLink: string;
            };
        };
        allContentfulBlogPost: {
            edges: [
                {
                    node: {
                        id: string;
                        title: string;
                        mainImage: {
                            resolutions: {
                                src: string;
                            };
                        };
                        slug: string;
                        postedDate: string;
                        createdAt: string;
                    };
                }
            ];
        };
    };
}

export const IndexQuery = graphql`
    query IndexQuery {
        site {
            siteMetadata {
                name
                tagline
                githubLink
            }
        }
        allContentfulBlogPost(
            limit: 3
            sort: { fields: [postedDate], order: DESC }
        ) {
            edges {
                node {
                    id
                    title
                    slug
                    mainImage {
                        resolutions {
                            src
                        }
                        id
                    }
                    postedDate(formatString: "MMMM DD, YYYY")
                    createdAt
                }
            }
        }
    }
`;
export default class IndexPage extends React.Component<IndexProps, {}> {
    renderRecentPosts = (post: Post, index: number) => {
        let slug = `blog/${post.slug}`;
        return (
            <div key={index} className={`column ${indexCss.blogSummary}`}>
                <div>
                    <span className="title is-5 titleFont">{post.title}</span>
                    <br />
                    <span className={`${indexCss.date}`}>
                        {post.postedDate}
                    </span>
                </div>
                <br />

                <p className="">
                    A generic subtitle for now. This is just a short subtitle
                    that will hopefully be better someday.
                </p>
                {/* <div className={`has-text-centered ${indexCss.postButton}`}> */}
                <div className={`${indexCss.flexHeight}`}>
                    <a
                        href={slug}
                        className={`button is-link is-outlined ${
                            indexCss.postButton
                        }`}
                        // className="button is-link is-rounded is-outlined"
                    >
                        View Post
                    </a>
                </div>

                {/* </div> */}
            </div>
        );
    };
    public render() {
        const posts = this.props.data.allContentfulBlogPost.edges.map(
            edge => edge.node
        );

        return (
            <Layout>
                {/* <!-- Header --> */}

                <section className={`hero is-medium ${indexCss.hasBgImg}`}>
                    {/* <div className="hero-head">
                        <Navbar />
                    </div> */}
                    <div className={`hero-body container has-text-centered `}>
                        <div>
                            <h1
                                className={`title has-text-primary ${
                                    indexCss.titleText
                                }`}
                            >
                                Drake Loud
                            </h1>
                            <h2 className="subtitle is-3 has-text-grey">
                                Technology Innovator, Solutions Architect,
                                Software Developer
                            </h2>
                        </div>
                        {/* <div className={indexCss.indexImage} /> */}
                    </div>
                </section>
                {/* <section className="hero is-primary">
                    <div className="hero-body" />
                </section> */}
                <section className="section">
                    <div className="container">
                        <div className="columns is-vcentered">
                            <div className="column">
                                <p className="title has-text-primary">
                                    Recent Posts
                                </p>
                            </div>
                        </div>
                        <div className="columns">
                            {posts.map((post, index) =>
                                this.renderRecentPosts(post, index)
                            )}
                        </div>
                        <div>
                            <Link to="/blog">
                                <p>View More Posts</p>
                            </Link>
                        </div>
                        <hr />
                        <div className="columns is-vcentered">
                            <div className="column">
                                <p className="title has-text-primary">
                                    Projects
                                </p>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-2">
                                <figure className="image is-128x128">
                                    <img src={tsLogo} />
                                </figure>
                            </div>
                            <div className="column">
                                <span className="title is-3">
                                    Design Pattern Library
                                </span>
                                <p>
                                    Brief explanations and examples of simple
                                    design patterns. These patterns are general
                                    solutions to common problems. Happily
                                    written in Typescript ✌️
                                    <br />
                                </p>
                                <div className={indexCss.libraryBtn}>
                                    <a
                                        href="/"
                                        className={`button is-link is-outlined ${
                                            indexCss.postButton
                                        }`}
                                    >
                                        View Library
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }
}
