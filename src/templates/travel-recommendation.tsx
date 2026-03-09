import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { BLOCKS } from "@contentful/rich-text-types";
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
                        <div className={`columns is-centered content ${postCss.wraptext}`}>
                            <div className="column is-two-thirds">
                                <div className={`${postCss.title}`}>
                                    <h1 className="is-size-2 title has-text-primary" style={{ marginBottom: "0.25rem" }}>
                                        {rec.title}
                                    </h1>
                                    {rec.region && (
                                        <span className="tag is-small is-primary">
                                            {rec.region}
                                        </span>
                                    )}
                                </div>
                                {image && (
                                    <div style={{ height: 380, overflow: "hidden", borderRadius: 6, marginBottom: "2rem" }}>
                                        <GatsbyImage
                                            image={image}
                                            alt={rec.mainImage?.title ?? rec.title}
                                            style={{ width: "100%", height: "100%" }}
                                            imgStyle={{ objectFit: "cover", objectPosition: "center" }}
                                        />
                                    </div>
                                )}
                                {rec.content && (
                                    <div>{renderRichText(rec.content, {
                                        renderNode: {
                                            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                                                const asset = node.data.target;
                                                if (!asset?.gatsbyImageData) return null;
                                                const img = getImage(asset.gatsbyImageData);
                                                if (!img) return null;
                                                const isLandscape = img.width > img.height;
                                                return (
                                                    <GatsbyImage
                                                        image={img}
                                                        alt={asset.title ?? ""}
                                                        style={{ width: isLandscape ? "60%" : "40%", marginBottom: "1rem" }}
                                                    />
                                                );
                                            },
                                        },
                                    })}</div>
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
                gatsbyImageData(width: 1600, placeholder: BLURRED)
                title
            }
            content {
                raw
                references {
                    ... on ContentfulAsset {
                        __typename
                        contentful_id
                        title
                        gatsbyImageData(width: 400, placeholder: BLURRED)
                    }
                }
            }
        }
    }
`;
