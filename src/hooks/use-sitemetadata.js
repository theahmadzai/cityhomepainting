import { graphql, useStaticQuery } from 'gatsby'

export default function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          description
          address
          contacts {
            phone
            email
          }
          social {
            facebook
            twitter
            instagram
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}
