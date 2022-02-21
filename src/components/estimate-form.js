import React, { useState } from 'react'
import { Row, Col, Form, Input, Button, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Success from './success'
import Error from './error'
import * as styles from './estimate-form.module.less'

const { Item } = Form
const { TextArea } = Input

const formStatuses = {
  IDLE: 0,
  SUBMITTING: 1,
  SUCCESS: 2,
  ERROR: 3,
}

const EstimateForm = () => {
  const [formStatus, setFormStatus] = useState(formStatuses.IDLE)
  const [fileList, setFileList] = useState([])

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handleFinish = async values => {
    setFormStatus(formStatuses.SUBMITTING)

    const formData = new FormData()

    Object.entries(values).forEach(([k, v]) => formData.append(k, v))
    fileList.forEach(file => formData.append('files', file.originFileObj))

    try {
      fetch('/.netlify/functions/estimate-form', {
        method: 'POST',
        body: formData,
      })

      setFormStatus(formStatuses.SUCCESS)
    } catch (err) {
      setFormStatus(formStatuses.ERROR)
    }
  }

  if (formStatus === formStatuses.SUCCESS) return <Success />
  else if (formStatus === formStatuses.ERROR) return <Error />

  return (
    <Form
      className={styles.form}
      layout="vertical"
      size="large"
      colon={false}
      onFinish={handleFinish}
      scrollToFirstError
      noValidate
      style={{ marginBottom: '2rem' }}
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
        <TextArea rows={4} placeholder="Additional details..." />
      </Item>

      <Item>
        <Upload
          name="image"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={() => void 0}
          customRequest={({ onSuccess, file }) => onSuccess(null, file)}
          multiple
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Media</div>
          </div>
        </Upload>
      </Item>

      <Item>
        <Button
          type="ghost"
          htmlType="submit"
          loading={formStatus === formStatuses.SUBMITTING}
        >
          Submit
        </Button>
      </Item>
    </Form>
  )
}

export default EstimateForm
