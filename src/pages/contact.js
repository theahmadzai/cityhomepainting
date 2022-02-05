import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { getImage, StaticImage } from 'gatsby-plugin-image'
import BackgroundImage from 'gatsby-background-image'
import { convertToBgImage } from 'gbimage-bridge'
import { Row, Col, Typography, Button } from 'antd'
import Layout from '../components/layout/layout'
import ContactForm from '../components/contact-form'

const { Title, Paragraph } = Typography

const ContactPage = () => {
  const { contactImage } = useStaticQuery(graphql`
    query {
      contactImage: file(relativePath: { eq: "contact.jpg" }) {
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
        {...convertToBgImage(getImage(contactImage))}
        className="pageTitleBackground"
      >
        <Title className="pageTitle">Send Us a Message</Title>
      </BackgroundImage>

      <Row gutter={32} style={{ marginBottom: '2rem' }}>
        <Col span={24} md={12}>
          <Title level={2} className="heading">
            Have a Query?
          </Title>
          <Paragraph>
            Please send us a message if you have any request or referrals.
          </Paragraph>
          <Paragraph>
            Want to know what services do we provide? Please have a look at the
            list of services we are currently providing.
          </Paragraph>
          <Link to="/services">
            <Button type="primary" style={{ marginBottom: '2rem' }}>
              Services
            </Button>
          </Link>
          <StaticImage
            src="../images/send-message.png"
            alt="Send Message"
            placeholder="blurred"
          />
        </Col>
        <Col span={24} md={12}>
          <ContactForm />
        </Col>
      </Row>
    </Layout>
  )
}

export default ContactPage
