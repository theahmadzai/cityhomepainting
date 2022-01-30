import React from 'react'
import { Row, Col, Typography } from 'antd'
import {
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from '@ant-design/icons'
import useSiteMetadata from '../../hooks/use-sitemetadata'
import FooterCurve from '../svgs/footer-curve'
import * as styles from './footer.module.less'

const { Title, Paragraph } = Typography

export default function Footer() {
  const { title, description, contacts, social } = useSiteMetadata()

  return (
    <>
      <footer className={styles.footer}>
        <Row gutter={24} className={styles.footerItems}>
          <Col span={24} md={8} className={styles.footerItem}>
            <Title level={3}>Company</Title>
            <Paragraph>{description}</Paragraph>
          </Col>

          <Col span={24} md={8} className={styles.footerItem}>
            <Title level={3}>Contact Info</Title>
            <Paragraph>
              <PhoneOutlined title="Phone" />
              &nbsp;&nbsp;
              {contacts.phone}
            </Paragraph>
            <Paragraph>
              <MailOutlined title="Email" />
              &nbsp;&nbsp;
              {contacts.email}
            </Paragraph>
          </Col>

          <Col span={24} md={8} className={styles.footerItem}>
            <Title level={3}>Get in Touch</Title>
            <Paragraph>
              Subscribe to our RSS feed or follow us on Facebook and Twitter for
              the latest content
            </Paragraph>
            <div className={styles.icons}>
              <a href={social.facebook} rel="noreferrer" target="_blank">
                <FacebookOutlined title={`${title} Facebook`} />
              </a>
              <a href={social.twitter} rel="noreferrer" target="_blank">
                <TwitterOutlined title={`${title} Twitter`} />
              </a>
              <a href={social.instagram} rel="noreferrer" target="_blank">
                <InstagramOutlined title={`${title} Instagram`} />
              </a>
            </div>
          </Col>
        </Row>

        <div className={styles.copyrights}>
          <span>
            &copy; Copyright {new Date().getFullYear()} - {title}
          </span>
        </div>
      </footer>
      {/* <FooterCurve /> */}
    </>
  )
}
