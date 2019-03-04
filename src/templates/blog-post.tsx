import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import * as postCss from "./blog-post.module.scss";

interface BlogPostProps {
    data: {
        site: {
            siteMetadata: {
                name: string;
                tagline: string;
                githubLink: string;
            };
        };
        contentfulBlogPost: {
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
            content: {
                childMarkdownRemark: {
                    html: string;
                };
            };
        };
    };
}

export default class BlogPostTemplate extends React.Component<
    BlogPostProps,
    {}
> {
    render() {
        const post = this.props.data.contentfulBlogPost;

        return (
            <Layout>
                <section>
                    <div className="container">
                        <div className="columns content">
                            <div className="column is-two-thirds">
                                <div className={`${postCss.title}`}>
                                    <h1 className="is-size-2 title has-text-primary">
                                        {post.title}
                                    </h1>
                                    <h2 className="subtitle">
                                        A test subtitle
                                    </h2>
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            post.content.childMarkdownRemark
                                                .html
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }
}

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                name
                tagline
                githubLink
            }
        }
        contentfulBlogPost(slug: { eq: $slug }) {
            id
            mainImage {
                resolutions {
                    src
                }
                id
            }
            title
            postedDate(formatString: "MMMM Do, YYYY")
            content {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
`;
