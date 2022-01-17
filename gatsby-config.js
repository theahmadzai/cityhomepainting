module.exports = {
  siteMetadata: {
      title: `Home City Painting`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-plugin-theme-ui", {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      "trackingId": "nil"
    }
  }, "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};