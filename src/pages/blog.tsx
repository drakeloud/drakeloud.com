import * as React from "react";
import { graphql, Link } from "gatsby";
import * as styles from "./blog.module.scss";
import Layout from "../components/layout";

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

export default class BlogPage extends React.Component<BlogProps, {}> {
    renderPosts = (post: Post, index: number) => {
        let slug = `blog/${post.slug}`;
        return (
            // <div key={index} className={styles.BlogPostTile}>
            <div className="columns">
                <div className="column is-one-third">
                    <figure className="image is-5by3">
                        <img
                            src={post.mainImage.resolutions.src}
                            className="image"
                            // className={styles.PostImg}
                        />
                    </figure>
                </div>
                <div key={index} className="column">
                    <div className="">
                        <div>
                            <span className="title is-5">{post.title}</span>
                            <span>{post.postedDate}</span>
                        </div>
                        <p className="subtitle">A generic subtitle for now</p>
                        <Link to={slug}>
                            <p>View Post</p>
                        </Link>
                    </div>
                </div>
                {/* <div className="column">
                    <img
                        src={post.mainImage.resolutions.src}
                        className="image is-3by2"
                        // className={styles.PostImg}
                    /> 
                    <div />
                    <Link to={slug}>
                        <div className="post-list">
                            <h2>{post.title}</h2>
                            <span>{post.postedDate}</span>
                        </div>
                    </Link>
                </div> */}
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
                {/* <h1>{name}</h1>
                <p>{tagline}</p>
                <div className={styles.BlogPostsWrapper}>
                    {posts.map((post, index) => this.renderPosts(post, index))}
                </div>
                <a href={githubLink} className={styles.Link}>
                    See the code on Github &rarr;
                </a> */}
                <section className="hero is-primary is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">Blog</h1>
                            <h2 className="subtitle">
                                Blogging about Tech and Business
                            </h2>
                        </div>
                    </div>
                </section>
                <section className="section is-medium">
                    <div className="container">
                        <div className="columns is-vcentered">
                            <div className="column">
                                <p className="title">Recent Posts</p>
                            </div>
                        </div>
                        {posts.map((post, index) =>
                            this.renderPosts(post, index)
                        )}
                        <div>
                            <Link to="/blog">
                                <p>View More Posts</p>
                            </Link>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }
}
