import React, { PropTypes } from 'react'
import { Form, Input, Button, Select } from 'antd'
import styles from './search.less'

const search = ({
  onSearch,
  form: {
    validateFields,
    getFieldsValue,
    getFieldDecorator,
  },
}) => {
  function handleSubmit(e) {
    e.preventDefault()
    validateFields((errors) => {
      if (!!errors) {
        return
      }
      console.log(getFieldsValue());
      onSearch(getFieldsValue())
    })
  }

  return (
    <div className={styles.normal}>
      <div className={styles.search}>
        <Form inline onSubmit={handleSubmit}>
          <Form.Item hasFeedback>
            {getFieldDecorator('keyword', {
              initialValue: '',
            })(<Input />)}
          </Form.Item>
          <Button type="primary" htmlType="submit">搜索</Button>
        </Form>
      </div>
    </div>
  )
};


export default Form.create()(search)
