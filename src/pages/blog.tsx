import * as React from "react";
import { graphql, Link } from "gatsby";
import * as styles from "./blog.module.scss";
import Layout from "../components/layout";

interface Post {
    title: string;
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
        allContentfulBlogPost(sort: { fields: [postedDate] }) {
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
    renderMovieTile = (post: Post, index: number) => {
        let slug = `blog/${post.slug}`;
        return (
            <div key={index} className={styles.BlogPostTile}>
                <img
                    src={post.mainImage.resolutions.src}
                    className={styles.PostImg}
                />
                <Link to={slug}>
                    <div className="post-list">
                        <h2>{post.title}</h2>
                        <span>{post.postedDate}</span>
                    </div>
                </Link>
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
                <h1>{name}</h1>
                <p>{tagline}</p>
                <div className={styles.BlogPostsWrapper}>
                    {posts.map((post, index) =>
                        this.renderMovieTile(post, index)
                    )}
                </div>
                <a href={githubLink} className={styles.Link}>
                    See the code on Github &rarr;
                </a>
            </Layout>
        );
    }
}
