import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

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
        // const siteTitle = this.props.data.site.siteMetadata.title;
        // const { previous, next } = this.props.pageContext;

        return (
            <Layout>
                <div className="">
                    <section className="hero is-primary is-bold">
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">{post.title}</h1>
                                <h2 className="subtitle">A test subtitle</h2>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container content is-centered">
                            <div className="column is-half">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            post.content.childMarkdownRemark
                                                .html
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                </div>
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
