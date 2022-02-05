import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage, getImage } from 'gatsby-plugin-image'
import BackgroundImage from 'gatsby-background-image'
import { convertToBgImage } from 'gbimage-bridge'
import { Row, Col, Typography, Tabs, Collapse } from 'antd'
import Layout from '../components/layout/layout'

const { Title, Paragraph } = Typography
const { TabPane } = Tabs
const { Panel } = Collapse

const AboutPage = () => {
  const { aboutImage } = useStaticQuery(graphql`
    query {
      aboutImage: file(relativePath: { eq: "about.jpg" }) {
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
        {...convertToBgImage(getImage(aboutImage))}
        className="pageTitleBackground"
      >
        <Title className="pageTitle">About Us</Title>
      </BackgroundImage>

      <Title level={2} className="heading">
        CityHome Painting
      </Title>

      <Row gutter={[24]}>
        <Col span={24} sm={12} md={16}>
          <Paragraph align="justify">
            CityHome Painting is a Georgia State certified company its main goal
            is to provide the best services for a reasonable price. Our crew
            have years of experience in their fields of profession. They have
            served all over Atlanta area and have accomplished tons of projects
            with customer satisfaction. Panthers Painting is always considering
            experienced crew for its projects.
          </Paragraph>
        </Col>
        <Col span={24} sm={12} md={8}>
          <StaticImage
            src="../images/about-side.jpg"
            alt="About side"
            placeholder="blurred"
          />
        </Col>
      </Row>

      <Tabs type="card">
        <TabPane tab="Interior" key="1">
          <Row gutter={[32, 12]}>
            <Col span={24} sm={12} md={8}>
              <StaticImage
                src="../images/interior.jpg"
                alt="Interior"
                placeholder="blurred"
              />
            </Col>
            <Col span={24} sm={12} md={16}>
              <Paragraph align="justify">
                On interior painting we will consider the best quality paint and
                will be done by professional painters. Our rates will be
                competitive.
              </Paragraph>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Exterior" key="2">
          <Row gutter={[32, 12]}>
            <Col span={24} sm={12} md={8}>
              <StaticImage
                src="../images/exterior.jpg"
                alt="Exterior"
                placeholder="blurred"
              />
            </Col>
            <Col span={24} sm={12} md={16}>
              <Paragraph align="justify">
                On the Exterior painting the prep work will be done by pressure
                washing and scraping to remove the old pealing paint, the gaps
                and cracks will be caulked and will make sure all of the rotted
                woods are replaced.
              </Paragraph>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Fence &amp; Gate" key="3">
          <Row gutter={[32, 12]}>
            <Col span={24} sm={12} md={8}>
              <StaticImage
                src="../images/fence-and-gate.jpg"
                alt="Fence and gate"
                placeholder="blurred"
              />
            </Col>
            <Col span={24} sm={12} md={16}>
              <Paragraph align="justify"></Paragraph>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      <Title level={2} className="heading">
        Frequently Asked Questions
      </Title>

      <Collapse defaultActiveKey={1} style={{ marginBottom: '2rem' }}>
        <Panel header="This is panel header 1" key="1">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            minus ipsa totam consequatur illo quibusdam, tempore exercitationem
            officiis, veniam voluptate minima, et culpa suscipit tempora quam
            pariatur nobis dolor eveniet.
          </p>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            minus ipsa totam consequatur illo quibusdam, tempore exercitationem
            officiis, veniam voluptate minima, et culpa suscipit tempora quam
            pariatur nobis dolor eveniet.
          </p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            minus ipsa totam consequatur illo quibusdam, tempore exercitationem
            officiis, veniam voluptate minima, et culpa suscipit tempora quam
            pariatur nobis dolor eveniet.
          </p>
        </Panel>
      </Collapse>
    </Layout>
  )
}

export default AboutPage
