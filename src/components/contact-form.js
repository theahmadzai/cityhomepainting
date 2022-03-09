import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import Success from './success'
import Error from './error'
import * as styles from './contact-form.module.less'

const { Item } = Form
const { TextArea } = Input

const formState = {
  IDLE: 0,
  SUBMITTING: 1,
  SUCCESS: 2,
  ERROR: 3,
}

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState(formState.IDLE)

  const handleFinish = async values => {
    setFormStatus(formState.SUBMITTING)

    try {
      await fetch('/.netlify/functions/contact-form', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      setFormStatus(formState.SUCCESS)
    } catch (err) {
      setFormStatus(formState.ERROR)
    }
  }

  if (formStatus === formState.SUCCESS) return <Success />
  else if (formStatus === formState.ERROR) return <Error />

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
        rules={[
          {
            required: true,
            message: 'Please type a brief message!',
          },
        ]}
      >
        <TextArea placeholder="Your message..." rows={5} />
      </Item>

      <Item>
        <Button
          type="ghost"
          htmlType="submit"
          loading={formStatus === formState.SUBMITTING}
        >
          Submit
        </Button>
      </Item>
    </Form>
  )
}

export default ContactForm
