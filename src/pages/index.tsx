import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as indexCss from "./index.module.scss";
import Layout from "../components/layout";
import tsLogo from "../images/typescript.png";
import self from "../images/self.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import EmailSignup from "../components/email-signup";

interface Post {
    id: string;
    title: string;
    slug: string;
    postedDate: string;
}

interface TravelRec {
    id: string;
    title: string;
    slug: string;
    region: string | null;
    mainImage: { gatsbyImageData: any; title: string } | null;
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
                        slug: string;
                        postedDate: string;
                        createdAt: string;
                    };
                }
            ];
        };
        allContentfulTravelRecommendation: {
            edges: { node: TravelRec }[];
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
            sort: { postedDate: DESC }
        ) {
            edges {
                node {
                    id
                    title
                    slug
                    postedDate(formatString: "MMMM DD, YYYY")
                    createdAt
                }
            }
        }
        allContentfulTravelRecommendation(
            filter: { topRecommendation: { eq: true } }
        ) {
            edges {
                node {
                    id
                    title
                    slug
                    region
                    mainImage {
                        gatsbyImageData(width: 600, placeholder: BLURRED)
                        title
                    }
                }
            }
        }
    }
`;
export default class IndexPage extends React.Component<IndexProps, {}> {
    renderTravelCard = (rec: TravelRec, index: number) => {
        const image = rec.mainImage ? getImage(rec.mainImage.gatsbyImageData) : null;
        return (
            <div key={index} className="column is-one-third-desktop is-half-tablet">
                <a href={`/travel/${rec.slug}/`} style={{ display: "block", height: "100%", color: "inherit" }}>
                    <div className="card" style={{ height: "100%" }}>
                        {image ? (
                            <div className="card-image">
                                <GatsbyImage
                                    image={image}
                                    alt={rec.mainImage?.title ?? rec.title}
                                    style={{ height: 200 }}
                                    imgStyle={{ objectFit: "cover" }}
                                />
                            </div>
                        ) : (
                            <div style={{ height: 200, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa", fontSize: "2rem" }}>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                        )}
                        <div className="card-content" style={{ padding: "0.75rem" }}>
                            <p className="title is-6 titleFont" style={{ marginBottom: "0.2rem" }}>{rec.title}</p>
                            {rec.region && (
                                <p style={{ fontSize: "0.8rem", color: "#888", margin: 0 }}>{rec.region}</p>
                            )}
                        </div>
                    </div>
                </a>
            </div>
        );
    };

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
                <div className={`${indexCss.flexHeight}`}>
                    <a
                        href={slug}
                        className={`button is-link is-outlined ${indexCss.postButton
                            }`}
                    >
                        View Post
                    </a>
                </div>
            </div>
        );
    };
    public render() {
        const posts = this.props.data.allContentfulBlogPost.edges.map(
            edge => edge.node
        );
        const travelRecs = this.props.data.allContentfulTravelRecommendation.edges.map(
            edge => edge.node
        );

        return (
            <Layout>
                <section className={`hero is-medium ${indexCss.hasBgImg}`}>
                    <div className={`hero-body container has-text-centered `}>
                        <div>
                            <h1
                                className={`title has-text-primary ${indexCss.titleText
                                    }`}
                            >
                                Drake Loud
                            </h1>
                            <h2 className="subtitle is-3 has-text-grey">
                                Emerging Tech Enthusiast, Full Stack Developer
                            </h2>
                        </div>
                    </div>
                </section>
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
                            <Link to="/blog/">
                                <p>View More Posts</p>
                            </Link>
                        </div>
                        {travelRecs.length > 0 && (
                            <>
                                <hr />
                                <div className="columns is-vcentered">
                                    <div className="column">
                                        <p className="title has-text-primary">Top Travel Recommendations</p>
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                    {travelRecs.map((rec, i) => this.renderTravelCard(rec, i))}
                                </div>
                                <div>
                                    <Link to="/travel/"><p>View All Recommendations</p></Link>
                                </div>
                            </>
                        )}
                        <hr />
                        <EmailSignup />
                        <hr />
                        <div className="columns is-vcentered">
                            <div className="column">
                                <p className="title has-text-primary">
                                    About Me
                                </p>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-2">
                                <figure className="image">
                                    <img
                                        className={` ${indexCss.selfImg}`}
                                        src={self}
                                    />
                                </figure>
                            </div>
                            <div className="column">
                                <span className="title is-4">Tech</span>
                                <p>
                                    I love creating and developing unique
                                    solutions. I'm interested in finding
                                    business value from emerging technologies
                                    and finding the viability of new services
                                    and offerings.
                                </p>
                                <br />

                                <span className="title is-4">Contact</span>
                                <p>
                                    I live and work in Chicago, IL. If you want
                                    to chat, then reach out to me on my
                                    <a href="https://www.linkedin.com/in/drakeloud">
                                        {" "}
                                        LinkedIn!
                                    </a>
                                </p>

                                <br />
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }
}
