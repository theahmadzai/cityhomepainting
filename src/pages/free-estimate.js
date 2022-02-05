import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import BackgroundImage from 'gatsby-background-image'
import { convertToBgImage } from 'gbimage-bridge'
import { Typography } from 'antd'
import Layout from '../components/layout/layout'
import EstimateForm from '../components/estimate-form'

const { Title } = Typography

const FreeEstimatePage = () => {
  const { quoteImage } = useStaticQuery(graphql`
    query {
      quoteImage: file(relativePath: { eq: "quote.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `)

  return (
    <Layout>
      <BackgroundImage
        {...convertToBgImage(getImage(quoteImage))}
        className="pageTitleBackground"
      >
        <Title className="pageTitle">Ask For a Free Estimate</Title>
      </BackgroundImage>

      <EstimateForm />
    </Layout>
  )
}

export default FreeEstimatePage
