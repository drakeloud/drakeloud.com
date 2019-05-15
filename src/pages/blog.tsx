import * as React from "react";
import { graphql, Link } from "gatsby";
import * as blogCss from "./blog.module.scss";
import Layout from "../components/layout";

interface Post {
    id: string;
    title: string;
    subtitle: string;
    mainImage: {
        resolutions: {
            src: string;
        };
    };
    slug: string;
    postedDate: string;
}
interface BlogProps {
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
                        subtitle: string;
                        mainImage: {
                            resolutions: {
                                src: string;
                            };
                        };
                        slug: string;
                        postedDate: string;
                    };
                }
            ];
        };
    };
}

export const BlogQuery = graphql`
    query BlogQuery {
        site {
            siteMetadata {
                name
                tagline
                githubLink
            }
        }
        allContentfulBlogPost(sort: { fields: [postedDate], order: DESC }) {
            edges {
                node {
                    id
                    title
                    subtitle
                    slug
                    mainImage {
                        resolutions {
                            src
                        }
                        id
                    }
                    postedDate(formatString: "MMMM DD, YYYY")
                }
            }
        }
    }
`;

export default class BlogPage extends React.Component<BlogProps, {}> {
    renderPosts = (post: Post, index: number) => {
        let slug = `${post.slug}`;
        return (
            <div key={index} className={` ${blogCss.post}`}>
                <div>
                    <span className="title is-4 titleFont">{post.title}</span>
                    <br />
                    <span className={`${blogCss.date}`}>{post.postedDate}</span>
                </div>
                <p className="">{post.subtitle}</p>
                <div>
                    <a href={slug} className={`button is-link is-outlined`}>
                        View Post
                    </a>
                </div>
            </div>
        );
    };

    public render() {
        const { name, tagline, githubLink } = this.props.data.site.siteMetadata;

        const posts = this.props.data.allContentfulBlogPost.edges.map(
            edge => edge.node
        );

        return (
            <Layout>
                <section className="section">
                    <div className="container">
                        <div className="title has-text-primary">My Posts</div>
                        {posts.map((post, index) =>
                            this.renderPosts(post, index)
                        )}
                    </div>
                </section>
            </Layout>
        );
    }
}
