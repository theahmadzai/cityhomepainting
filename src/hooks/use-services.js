import { graphql, useStaticQuery } from 'gatsby'

const useServices = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulService {
        nodes {
          slug
          title
          caption
          image {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              height: 300
              width: 300
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  `)

  return data.allContentfulService.nodes
}

export default useServices
