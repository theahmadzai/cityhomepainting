import React, { useState } from 'react'
import { Form, Rate, Input, Button } from 'antd'
import Success from './success'
import Error from './error'

const { Item } = Form
const { TextArea } = Input

const formState = {
  IDLE: 0,
  SUBMITTING: 1,
  SUCCESS: 2,
  ERROR: 3,
}

const ReviewForm = ({ slug }) => {
  const [formStatus, setFormStatus] = useState(formState.IDLE)
  const [rating, setRating] = useState(5)

  const handleFinish = async values => {
    setFormStatus(formState.SUBMITTING)

    try {
      await fetch('/.netlify/functions/create-review', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, rating, ...values }),
      })

      setRating(5)
      setFormStatus(formState.SUCCESS)
    } catch (err) {
      setFormStatus(formState.ERROR)
    }
  }

  if (formStatus === formState.SUCCESS) return <Success />
  else if (formStatus === formState.ERROR) return <Error />

  return (
    <Form
      layout="vertical"
      size="middle"
      colon={false}
      onFinish={handleFinish}
      noValidate
    >
      <Rate
        allowHalf
        defaultValue={5}
        value={rating}
        onChange={setRating}
        style={{ marginBottom: '1rem' }}
      />

      <Item name="name" hasFeedback help={false} rules={[{ required: true }]}>
        <Input placeholder="Your Name" />
      </Item>

      <Item
        name="description"
        hasFeedback
        help={false}
        rules={[{ required: true }]}
      >
        <TextArea placeholder="Description..." />
      </Item>

      <Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={formStatus === formState.SUBMITTING}
        >
          Rate
        </Button>
      </Item>
    </Form>
  )
}

export default ReviewForm
