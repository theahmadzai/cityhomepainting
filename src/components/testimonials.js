import React, { useReducer } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Rate, Row, Col } from 'antd'
import { StarFilled } from '@ant-design/icons'
import useTestimonials from '../hooks/use-testimonials.js'
import * as styles from './testimonials.module.less'

let totalTestimonials = 0

const fixTestimonialIndex = i =>
  i < 0 ? totalTestimonials - 1 : i > totalTestimonials - 1 ? 0 : i

const selectedTestimonialReducer = ({ prev, curr, next }, action) => {
  return {
    prev: fixTestimonialIndex(prev + action),
    curr: fixTestimonialIndex(curr + action),
    next: fixTestimonialIndex(next + action),
  }
}

export default function Testimonials() {
  const testimonials = useTestimonials()
  totalTestimonials = testimonials.length

  const [selectedTestimonial, dispatchSelectedTestimonial] = useReducer(
    selectedTestimonialReducer,
    {
      prev: 0,
      curr: 1,
      next: 2,
    }
  )

  const handlePrevTestimonial = () => dispatchSelectedTestimonial(-1)
  const handleNextTestimonial = () => dispatchSelectedTestimonial(1)

  const prev = testimonials[selectedTestimonial.prev]
  const curr = testimonials[selectedTestimonial.curr]
  const next = testimonials[selectedTestimonial.next]

  return (
    <div className={styles.testimonials}>
      <Row gutter={[24, 24]} justify="space-between" align="middle">
        <Col span={24} md={6}>
          <GatsbyImage
            className={styles.control}
            onClick={handlePrevTestimonial}
            image={getImage(prev.image)}
            alt={prev.name}
          />
        </Col>
        <Col span={24} md={12}>
          <figure className={styles.testimonial}>
            <GatsbyImage
              className={styles.image}
              image={getImage(curr.image)}
              alt={curr.name}
            />

            <blockquote>{curr.message.message}</blockquote>

            <Rate
              count={5}
              defaultValue={5}
              style={{ color: '#333', marginBottom: '1rem' }}
              disabled
            />

            <p>
              <strong>- {curr.name} -</strong>
            </p>
          </figure>
        </Col>
        <Col span={24} md={6}>
          <GatsbyImage
            className={styles.control}
            onClick={handleNextTestimonial}
            image={getImage(next.image)}
            alt={next.name}
          />
        </Col>
      </Row>
    </div>
  )
}
