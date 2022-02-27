import React, { useState, useCallback, useEffect } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import {
  Row,
  Col,
  Rate,
  Typography,
  Input,
  Button,
  Divider,
  Avatar,
  List,
} from 'antd'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import Layout from '../../components/layout/layout'
import Success from '../../components/success'
import Error from '../../components/error'

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

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
  const [formStatus, setFormStatus] = useState(0)
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetch(`/.netlify/functions/all-reviews?slug=${slug}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => setReviews(res))
      .catch(console.error)
  }, [slug])

  const submitReview = useCallback(() => {
    fetch('/.netlify/functions/create-review', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug, rating, name, description }),
    })
      .then(res => res.json())
      .then(() => {
        setFormStatus(1)
        setRating(5)
        setName('')
        setDescription('')
      })
      .catch(() => setFormStatus(-1))
  }, [slug, rating, name, description])

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
          {formStatus === 0 ? (
            <div>
              <Divider />
              <Rate
                allowHalf
                defaultValue={5}
                value={rating}
                onChange={setRating}
                style={{ marginBottom: '1rem' }}
              />
              <Input
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextArea
                placeholder="Description..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <Button type="primary" onClick={submitReview}>
                Rate
              </Button>
            </div>
          ) : formStatus === 1 ? (
            <Success />
          ) : (
            <Error />
          )}
        </Col>
      </Row>
    </Layout>
  )
}
