import React from 'react'
import { Result, Button } from 'antd'

const Error = () => {
  return (
    <Result
      status="error"
      title="Submission Failed"
      subTitle="Please try again later."
      extra={
        <Button type="primary" onClick={() => window.history.go()}>
          Refresh
        </Button>
      }
    />
  )
}

export default Error
