import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import BackgroundImage from 'gatsby-background-image'
import { convertToBgImage } from 'gbimage-bridge'
import { Row, Col, Button, Typography } from 'antd'
import useServices from '../../hooks/use-services'
import Layout from '../../components/layout/layout'
import ServicePreview from '../../components/service-preview'

const { Title, Paragraph } = Typography

const ServicesPage = () => {
  const services = useServices()
  const { servicesImage } = useStaticQuery(graphql`
    query {
      servicesImage: file(relativePath: { eq: "services.jpg" }) {
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
        {...convertToBgImage(getImage(servicesImage))}
        className="pageTitleBackground"
      >
        <Title className="pageTitle">Services</Title>
      </BackgroundImage>

      <Paragraph
        style={{
          marginTop: '2rem',
          textAlign: 'justify',
          textAlignLast: 'center',
        }}
      >
        CityHome Painting accepts residential construction painting and
        repairing services. We are trying to provide the best services with the
        most reasonable price. Our estimates are always free, we encourage you
        to provide us with the complete information for preparing an estimate
        report by clicking the free Estimate tab provided at the top right of
        the page and we will be able to provide you an estimate within 2 days.
      </Paragraph>

      <Link to="/free-estimate">
        <Button
          type="ghost"
          style={{ display: 'block', margin: '0 auto 2rem' }}
        >
          Ask For a Free Estimate
        </Button>
      </Link>

      <Row gutter={[32, 32]} style={{ marginBottom: '2rem' }}>
        {services.map((service, i) => (
          <Col span={24} sm={12} md={8} key={i}>
            <ServicePreview {...service} />
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default ServicesPage
