require(`dotenv`).config({ path: `.env` });

module.exports = {
    siteMetadata: {
        name: `Test Blog site`,
        tagline: `"Do, or do not. There is no try."`,
        githubLink: `https://github.com`
    },
    plugins: [
        `gatsby-plugin-sass`,
        `gatsby-plugin-typescript`,
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-remark`,
        `gatsby-image`,
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
            }
        }
    ]
};
