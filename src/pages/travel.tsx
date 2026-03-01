import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/layout";
import TravelGlobe from "../components/travel-globe";

// All colors chosen to be readable as text/border on a white background
const REGION_COLORS = [
    "#e85d04", // deep orange
    "#1976d2", // blue
    "#388e3c", // green
    "#7b1fa2", // purple
    "#c62828", // red
    "#0097a7", // cyan
    "#f57c00", // amber
    "#00695c", // dark teal
];

const regionId = (r: string) => `region-${r.toLowerCase().replace(/\s+/g, "-")}`;

interface Recommendation {
    id: string;
    title: string;
    slug: string;
    region: string | null;
    location: {
        lat: number;
        lon: number;
    } | null;
    mainImage: {
        gatsbyImageData: any;
        title: string;
    } | null;
}

interface TravelProps {
    data: {
        allContentfulTravelRecommendation: {
            edges: {
                node: Recommendation;
            }[];
        };
    };
}

export const TravelQuery = graphql`
    query TravelQuery {
        allContentfulTravelRecommendation {
            edges {
                node {
                    id
                    title
                    slug
                    region
                    location {
                        lat
                        lon
                    }
                    mainImage {
                        gatsbyImageData(width: 600, placeholder: BLURRED)
                        title
                    }
                }
            }
        }
    }
`;

export default class TravelPage extends React.Component<TravelProps, {}> {
    renderCard = (rec: Recommendation, index: number) => {
        const image = rec.mainImage
            ? getImage(rec.mainImage.gatsbyImageData)
            : null;

        return (
            <div
                key={index}
                className="column is-one-third-desktop is-half-tablet"
            >
                <a
                    href={`/travel/${rec.slug}/`}
                    style={{ display: "block", height: "100%", color: "inherit" }}
                >
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
                            <div
                                style={{
                                    height: 200,
                                    background: "#f0f0f0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#aaa",
                                    fontSize: "2rem"
                                }}
                            >
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                        )}
                        <div className="card-content">
                            <p className="title is-5 titleFont">{rec.title}</p>
                        </div>
                    </div>
                </a>
            </div>
        );
    };

    public render() {
        const recs =
            this.props.data.allContentfulTravelRecommendation.edges.map(
                edge => edge.node
            );

        const grouped = recs.reduce(
            (acc, rec) => {
                const region = rec.region ?? "Other";
                if (!acc[region]) acc[region] = [];
                acc[region].push(rec);
                return acc;
            },
            {} as Record<string, Recommendation[]>
        );

        const regions = Object.keys(grouped).sort();
        const colorMap: Record<string, string> = {};
        regions.forEach((r, i) => {
            colorMap[r] = REGION_COLORS[i % REGION_COLORS.length];
        });
        regions.forEach(r => grouped[r].sort((a, b) => a.title.localeCompare(b.title)));

        const globePoints = recs
            .filter(rec => rec.location)
            .map(rec => ({
                lat: rec.location!.lat,
                lng: rec.location!.lon,
                label: rec.title,
                slug: rec.slug,
                color: colorMap[rec.region ?? "Other"],
            }));

        return (
            <Layout>
                <section className="section">
                    <div className="container">
                        <h1
                            className="title has-text-primary"
                            style={{ marginBottom: "1.5rem" }}
                        >
                            Travel Recommendations
                        </h1>
                        {globePoints.length > 0 && (
                            <TravelGlobe points={globePoints} />
                        )}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                            {regions.map(region => (
                                <a
                                    key={region}
                                    href={`#${regionId(region)}`}
                                    className="tag is-small"
                                    style={{
                                        background: "transparent",
                                        border: `2px solid ${colorMap[region]}`,
                                        color: colorMap[region],
                                        fontWeight: 600,
                                    }}
                                >
                                    {region}
                                </a>
                            ))}
                        </div>
                        {regions.map(region => {
                            const regionRecs = grouped[region];
                            return (
                                <div key={region} id={regionId(region)} style={{ marginBottom: "3rem", scrollMarginTop: "4rem" }}>
                                    <h2
                                        className="title is-4"
                                        style={{ marginBottom: "0.75rem", color: colorMap[region] }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faLocationDot}
                                            style={{ marginRight: "0.6rem" }}
                                        />
                                        {region}
                                    </h2>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
                                        {regionRecs.map(rec => (
                                            <a
                                                key={rec.id}
                                                href={`/travel/${rec.slug}/`}
                                                className="tag is-small"
                                                style={{
                                                    background: "transparent",
                                                    border: `1px solid ${colorMap[region]}`,
                                                    color: colorMap[region],
                                                }}
                                            >
                                                {rec.title}
                                            </a>
                                        ))}
                                    </div>
                                    <hr style={{ marginTop: 0 }} />
                                    <div className="columns is-multiline">
                                        {regionRecs.map((rec, index) =>
                                            this.renderCard(rec, index)
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </Layout>
        );
    }
}
