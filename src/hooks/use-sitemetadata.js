import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
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

export default useSiteMetadata
