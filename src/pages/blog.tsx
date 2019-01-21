import * as React from "react";
import { graphql } from "gatsby";
import * as styles from "./blog.module.scss";

interface Post {
    title: string;
    subtitle: {
        subtitle: string;
    };
    description: {
        description: string;
    };
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
                        title: string;
                        subtitle: {
                            subtitle: string;
                        };
                        description: {
                            description: string;
                        };
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
        allContentfulBlogPost(sort: { fields: [postedDate] }) {
            edges {
                node {
                    title
                    subtitle {
                        subtitle
                    }
                    description {
                        description
                    }
                    mainImage {
                        resolutions {
                            src
                        }
                    }
                    slug
                    postedDate(formatString: "MMMM DD, YYYY")
                }
            }
        }
    }
`;

export default class IndexPage extends React.Component<BlogProps, {}> {
    renderMovieTile = (post: Post, index: number) => {
        return (
            <div key={index} className={styles.BlogPostTile}>
                <img
                    src={post.mainImage.resolutions.src}
                    className={styles.PostImg}
                />
                <h2>{post.title}</h2>
                <span>{post.postedDate}</span>
                <p>{post.description.description}</p>
            </div>
        );
    };

    public render() {
        const { name, tagline, githubLink } = this.props.data.site.siteMetadata;

        const posts = this.props.data.allContentfulBlogPost.edges.map(
            edge => edge.node
        );

        return (
            <div className={styles.Container}>
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
            </div>
        );
    }
}
