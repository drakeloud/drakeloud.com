import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import * as postCss from "./blog-post.module.scss";
import EmailSignup from "../components/email-signup";

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
            subtitle: string;
            slug: string;
            postedDate: string;
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
                    <div className={`container ${postCss.containerPadding}`}>
                        <div className={`columns content ${postCss.wraptext}`}>
                            <div className="column is-two-thirds">
                                <div className={`${postCss.title}`}>
                                    <h1 className="is-size-2 title has-text-primary">
                                        {post.title}
                                    </h1>
                                    <h2
                                        className={`${postCss.subtitle} subtitle`}
                                    >
                                        {post.subtitle}
                                    </h2>
                                    <p className={`${postCss.postDate}`}>
                                        {post.postedDate}
                                    </p>
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
                        <hr />
                        <EmailSignup />
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
            title
            subtitle
            postedDate(formatString: "MMMM Do, YYYY")
            content {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
`;
