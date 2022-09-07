import React, { Fragment } from 'react'
import useSiteMetadata from '../hooks/use-sitemetadata'

const SEO = ({ title, description, pathname }) => {
  const {
    siteUrl,
    title: defaultTitle,
    description: defaultDescription,
  } = useSiteMetadata()

  description ??= defaultDescription
  pathname ??= '/'

  return (
    <Fragment>
      <title>
        {title} | {defaultTitle}
      </title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="image" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl + pathname} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="image" />
      <link
        href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;600&display=swap"
        rel="stylesheet"
      />
    </Fragment>
  )
}

export default SEO
