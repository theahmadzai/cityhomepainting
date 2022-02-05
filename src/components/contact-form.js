import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import Success from './success'
import Error from './error'
import * as styles from './contact-form.module.less'

const { Item } = Form
const { TextArea } = Input

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState(0)

  const handleFinish = values => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'contact',
        ...values,
      }).toString(),
    })
      .then(() => setFormStatus(1))
      .catch(() => setFormStatus(-1))
  }

  if (formStatus === 1) return <Success />
  else if (formStatus === -1) return <Error />

  return (
    <Form
      className={styles.form}
      layout="vertical"
      size="large"
      scrollToFirstError
      onFinish={handleFinish}
      noValidate
    >
      <Item
        label="Full Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please type your full name!',
          },
        ]}
      >
        <Input type="text" placeholder="John Doe" />
      </Item>

      <Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please type your email!',
          },
          {
            type: 'email',
            message: 'Please type a valid email!',
          },
        ]}
      >
        <Input type="email" placeholder="john@example.com" />
      </Item>

      <Item label="Phone" name="phone">
        <Input type="tel" placeholder="+123********" />
      </Item>

      <Item
        label="Message"
        name="message"
        rules={[{ required: true, message: 'Please type a brief message!' }]}
        required
      >
        <TextArea placeholder="Your message..." rows={5} />
      </Item>

      <Item>
        <Button type="ghost" htmlType="submit">
          Submit
        </Button>
      </Item>
    </Form>
  )
}

export default ContactForm
