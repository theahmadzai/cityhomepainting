require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: 'CityHome Painting',
    siteUrl: 'https://cityhomepainting.com',
    description: 'CityHome Painting Description',
    address: 'CityHome Painting Address',
    contacts: {
      phone: '(470)-539-3711',
      email: 'info@cityhomepainting.com',
    },
    social: {
      facebook: 'https://www.facebook.com/cityhomepainting',
      twitter: 'https://www.twitter.com/@cityhomepainting',
      instagram: 'https://www.instagram.com/cityhomepainting',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'nil',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: 'x6orn6luc2x1',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-import',
      options: {
        libraryName: 'antd',
        style: true,
      },
    },
    {
      resolve: 'gatsby-plugin-less',
      options: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            '@primary-color': '#29b0fa',
            '@font-size-base': '18px',
            '@font-family': 'Work Sans',
          },
        },
      },
    },
    'gatsby-plugin-minify-classnames',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'CityHome Painting',
        short_name: 'CityHome Painting',
        start_url: '/',
        background_color: '#29b0fa',
        theme_color: '#29b0fa',
        display: 'standalone',
        icon: 'static/logo.png',
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
  ],
}
