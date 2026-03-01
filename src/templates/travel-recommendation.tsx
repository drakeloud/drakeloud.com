import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Layout from "../components/layout";
import * as postCss from "./blog-post.module.scss";
import EmailSignup from "../components/email-signup";

interface TravelRecommendationProps {
    data: {
        contentfulTravelRecommendation: {
            id: string;
            title: string;
            region: string | null;
            location: {
                lat: number;
                lon: number;
            } | null;
            mainImage: {
                gatsbyImageData: any;
                title: string;
            } | null;
            content: any;
        };
    };
}

export default class TravelRecommendationTemplate extends React.Component<
    TravelRecommendationProps,
    {}
> {
    render() {
        const rec = this.props.data.contentfulTravelRecommendation;
        const image = rec.mainImage ? getImage(rec.mainImage.gatsbyImageData) : null;

        return (
            <Layout>
                <section>
                    <div className={`container ${postCss.containerPadding}`}>
                        <div className={`columns content ${postCss.wraptext}`}>
                            <div className="column is-two-thirds">
                                <div className={`${postCss.title}`}>
                                    <h1 className="is-size-2 title has-text-primary">
                                        {rec.title}
                                    </h1>
                                    {rec.region && (
                                        <span className="tag is-link is-medium">
                                            {rec.region}
                                        </span>
                                    )}
                                </div>
                                {image && (
                                    <GatsbyImage
                                        image={image}
                                        alt={rec.mainImage?.title ?? rec.title}
                                        style={{ marginBottom: "2rem", borderRadius: 6 }}
                                    />
                                )}
                                {rec.content && (
                                    <div>{renderRichText(rec.content)}</div>
                                )}
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
    query TravelRecommendationBySlug($slug: String!) {
        contentfulTravelRecommendation(slug: { eq: $slug }) {
            id
            title
            region
            location {
                lat
                lon
            }
            mainImage {
                gatsbyImageData(width: 800, placeholder: BLURRED)
                title
            }
            content {
                raw
            }
        }
    }
`;
