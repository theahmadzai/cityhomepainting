import React from 'react'
import { Typography } from 'antd'
import Layout from '../components/layout/layout'
import Testimonials from '../components/testimonials'

const { Title, Paragraph } = Typography

const IndexPage = () => {
  return (
    <Layout>
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Title level={2}>CityHome Painting</Title>

        <Paragraph align="justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse nostrum
          earum delectus eaque neque est itaque eos autem porro facere illo
          illum distinctio odio, iure, dolor qui quia architecto quisquam. Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Iste provident
          exercitationem, ad vel, porro tempore quae recusandae quia architecto
          mollitia quis nostrum consequatur excepturi rerum sint perferendis,
          incidunt suscipit? Nemo?
        </Paragraph>
      </div>

      <Testimonials />
    </Layout>
  )
}

export default IndexPage
