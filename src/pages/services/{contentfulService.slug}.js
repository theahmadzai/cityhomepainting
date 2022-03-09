import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Row, Col, Rate, Typography, Avatar, List, Divider } from 'antd'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import Layout from '../../components/layout/layout'
import ReviewForm from '../../components/review-form'

const { Title, Paragraph, Text } = Typography

export const query = graphql`
  query ($slug: String!) {
    service: contentfulService(slug: { eq: $slug }) {
      title
      slug
      caption
      image {
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: TRACED_SVG
          formats: [AUTO, WEBP]
        )
      }
      body {
        raw
      }
    }
  }
`

export default function ServiceTemplate({
  data: { service },
  pageContext: { slug },
}) {
  const { title, image } = service
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch(`/.netlify/functions/all-reviews?slug=${slug}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => setReviews(res))
      .catch(console.error)
  }, [slug])

  return (
    <Layout>
      <Row gutter={32} style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Col span={24} md={12}>
          <GatsbyImage
            className="serviceImage"
            image={getImage(image)}
            alt={title}
          />
          <List
            style={{ marginTop: '2rem' }}
            dataSource={reviews}
            renderItem={review => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor:
                          '#' +
                          Math.floor(Math.random() * 16777215).toString(16),
                      }}
                    >
                      {review.name.slice(0, 1)}
                    </Avatar>
                  }
                  title={review.name}
                  description={
                    <>
                      <Rate
                        allowHalf
                        value={review.rating}
                        defaultValue={5}
                        disabled
                      />
                      <Paragraph>{review.description}</Paragraph>
                      <Text type="secondary">
                        {new Date(review.date).toDateString()}
                      </Text>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={24} md={12}>
          <Title>{service.title}</Title>
          <Rate allowHalf value={5} defaultValue={5} disabled />
          <Paragraph type="secondary">{service.caption}</Paragraph>
          <Paragraph>{renderRichText(service.body)}</Paragraph>
          <Divider />
          <ReviewForm slug={slug} />
        </Col>
      </Row>
    </Layout>
  )
}
