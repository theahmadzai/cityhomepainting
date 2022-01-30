import React from 'react'
import { Result, Button } from 'antd'

export default function Success() {
  return (
    <Result
      status="success"
      title="Form has been submitted Successfully!"
      subTitle="Please wait for the response of your submission, We will reply you with the information you provided."
      extra={
        <Button type="primary" onClick={() => window.history.go()}>
          Refresh
        </Button>
      }
    />
  )
}
