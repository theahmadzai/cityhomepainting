import React, { useState } from 'react'
import { Row, Col, Form, Input, Button, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Success from './success'
import Error from './error'
import styles from './estimate-form.module.less'

const { Item } = Form
const { TextArea } = Input

export default function QuoteForm() {
  const [formStatus, setFormStatus] = useState(0)
  const [images, setImages] = useState([])

  const handleImagesUploaded = info => {
    setImages(info.fileList)
  }

  const handleFinish = values => {
    const formData = new FormData()

    Object.entries(values).forEach(([k, v]) => formData.append(k, v))
    images.forEach(image => formData.append('images', image.originFileObj))

    fetch('/.netlify/functions/send-estimate', {
      method: 'POST',
      body: formData,
    })
      .then(() => setFormStatus(1))
      .catch(() => setFormStatus(-1))
  }

  if (formStatus === 1) return <Success />
  else if (formStatus === -1) return <Error />

  return (
    <Form
      action="/"
      className={styles.form}
      layout="vertical"
      size="large"
      colon={false}
      onFinish={handleFinish}
      scrollToFirstError
      noValidate
    >
      <Row gutter={32}>
        <Col span={24} md={12}>
          <Item
            label="First Name"
            name="firstname"
            rules={[
              {
                required: true,
                message: 'Please type your first name!',
              },
            ]}
          >
            <Input placeholder="John" />
          </Item>
        </Col>
        <Col span={24} md={12}>
          <Item
            label="Last Name"
            name="lastname"
            rules={[
              {
                required: true,
                message: 'Please type your last name!',
              },
            ]}
          >
            <Input placeholder="Doe" />
          </Item>
        </Col>
      </Row>

      <Row gutter={32}>
        <Col span={24} md={12}>
          <Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please type your phone no!',
              },
            ]}
          >
            <Input placeholder="+123********" />
          </Item>
        </Col>
        <Col span={24} md={12}>
          <Item
            label="Email"
            name="email"
            rules={[
              { required: false },
              {
                type: 'email',
                message: 'Please type a valid email!',
              },
            ]}
          >
            <Input placeholder="john@example.com" />
          </Item>
        </Col>
      </Row>

      <Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: 'Please type your address!',
          },
        ]}
      >
        <Input placeholder="House # 3.." />
      </Item>

      <Row gutter={32}>
        <Col span={24} md={12}>
          <Item
            label="Street"
            name="street"
            rules={[
              {
                required: true,
                message: 'Please type your street address!',
              },
            ]}
          >
            <Input placeholder="Carroll Street" />
          </Item>
        </Col>
        <Col span={24} md={12}>
          <Item
            label="City"
            name="city"
            rules={[
              {
                required: true,
                message: 'Please type your city name!',
              },
            ]}
          >
            <Input placeholder="Atlanta" />
          </Item>
        </Col>
      </Row>

      <Row gutter={32}>
        <Col span={24} md={12}>
          <Item
            label="Zip Code"
            name="zipcode"
            rules={[
              {
                required: true,
                message: 'Please type your zipcode!',
              },
              {
                len: 5,
                message: 'Please type a valid zipcode!',
              },
            ]}
          >
            <Input placeholder="30301" />
          </Item>
        </Col>
        <Col span={24} md={12}>
          <Item
            label="State"
            name="state"
            rules={[
              {
                required: true,
                message: 'Please type your state name!',
              },
            ]}
          >
            <Input placeholder="Georgia" />
          </Item>
        </Col>
      </Row>

      <Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please type some message!',
          },
        ]}
      >
        <TextArea rows={6} placeholder="Additional details..." />
      </Item>

      <Item>
        <Upload
          name="image"
          listType="picture-card"
          onChange={handleImagesUploaded}
          multiple
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Item>

      <Item>
        <Button type="ghost" htmlType="submit">
          Submit
        </Button>
      </Item>
    </Form>
  )
}
