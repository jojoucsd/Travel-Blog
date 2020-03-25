module.exports = {
  siteMetadata: {
    siteUrl: 'https://ling-travel-blog.netlify.com/',
    title: `Ling's Travel Blog`,
    description: `Travel Blog build with Gatsby frontend and Strapi backend`,
    author: `@LingLu`,
    mapboxToken: process.env.GATSBY_MAPBOX_TOKEN 
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
        : process.env.LOCAL_HOST,
        contentTypes: [
          `article`,
          `user`,
        ],
        queryLimit: 1000,
      }
    },
    'gatsby-plugin-antd',
    `gatsby-plugin-emotion`,
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
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
