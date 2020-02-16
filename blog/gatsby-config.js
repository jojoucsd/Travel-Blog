module.exports = {
  siteMetadata: {
    siteUrl: 'https://ling-travel-blog.netlify.com/',
    title: `Ling's Travel Blog`,
    description: `Travel Blog build with Gatsby frontend and Strapi backend`,
    author: `@LingLu`,
    mapboxToken: 'pk.eyJ1Ijoiam9qb2xldG8iLCJhIjoiY2s2bnpvcHJ5MTYzdTNscWY1ZzhwN3B0dCJ9.E6pSkuWSetSHum1oANhlWA',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.DEPLOY_URL
        ? 'https://family-travel-blog.herokuapp.com'
        : 'http://localhost:1337',
        contentTypes: [
          `article`,
          `user`,
        ],
        queryLimit: 1000,
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/ling-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
