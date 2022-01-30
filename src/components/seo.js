import React from 'react'
import Helmet from 'react-helmet'
import useSiteMetadata from '../hooks/use-sitemetadata'

export default function SEO({ title, description, pathname }) {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
  } = useSiteMetadata()

  title ??= defaultTitle
  description ??= defaultDescription
  pathname ??= '/'

  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={title}
      titleTemplate={`%s | ${defaultTitle}`}
      meta={[
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: `${siteUrl}${pathname}` },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'image' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: 'image' },
      ]}
    />
  )
}
