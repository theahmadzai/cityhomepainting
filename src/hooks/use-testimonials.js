import { graphql, useStaticQuery } from 'gatsby'

export default function useTestimonials() {
  const data = useStaticQuery(graphql`
    query {
      allContentfulTestimonial {
        nodes {
          name
          message {
            message
          }
          image {
            title
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              height: 125
              width: 125
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  `)

  return data.allContentfulTestimonial.nodes
}
