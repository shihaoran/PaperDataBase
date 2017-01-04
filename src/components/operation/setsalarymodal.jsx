import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal, Select} from 'antd'
import {connect} from 'dva'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  search,
  dispatch,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  const {
    user_id, modalVisible, modalType, currentItem,
  } = search;

  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        editor_id:currentItem.editor_id,
      };
      const datastr = {
        ...data,
        salary:data.salary.toString(),
      };
      dispatch({
        type: 'search/setSalary',
        payload: datastr,
      });
      dispatch({
        type: 'search/hideModal',
      });
    })
  }
  function handleClose() {
    dispatch({
      type: 'search/hideModal',
    });
  }
  const cur_salary=currentItem.editor_salary;

  const modalOpts = {
    title: '设置工资',
    visible:modalVisible,
    onOk: handleOk,
    onCancel:handleClose,
    wrapClassName: 'vertical-center-modal',
  };


  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="请设置新工资：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('salary', {
            initialValue: cur_salary,
            rules: [
              {
                required: true,
                type: 'number',
                message: '工资未填写',
              },
            ],
          })(<InputNumber min={2000} max={10000} />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default connect(({search}) => ({search}))(Form.create()(modal));
