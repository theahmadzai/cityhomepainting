import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Typography } from 'antd'
import * as styles from './service-preview.module.less'

const { Paragraph } = Typography

const ServicePreview = ({ slug, title, caption, image }) => {
  return (
    <Link to={`/services/${slug}`}>
      <div className={styles.card}>
        <GatsbyImage
          image={getImage(image)}
          alt={title}
          className={styles.image}
        />
        <div className={styles.meta}>
          <Paragraph className={styles.title}>{title}</Paragraph>
          <Paragraph type="secondary">{caption}</Paragraph>
        </div>
      </div>
    </Link>
  )
}

export default ServicePreview
