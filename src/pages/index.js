import React from 'react'
import { Typography } from 'antd'
import Layout from '../components/layout/layout'

const { Title, Paragraph } = Typography

const IndexPage = () => {
  return (
    <Layout>
      <Title level={2}>CityHome Painting</Title>

      <Paragraph align="justify">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse nostrum
        earum delectus eaque neque est itaque eos autem porro facere illo illum
        distinctio odio, iure, dolor qui quia architecto quisquam.
      </Paragraph>

      <Paragraph align="justify">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse nostrum
        earum delectus eaque neque est itaque eos autem porro facere illo illum
        distinctio odio, iure, dolor qui quia architecto quisquam.
      </Paragraph>
    </Layout>
  )
}

export default IndexPage
