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
    _journallist, _fieldlist, user_id, modalVisible, modalType,
  } = search;

  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        paper_author_id:user_id,
      };
      dispatch({
        type: 'search/addPaper',
        payload: data,
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

  function handleFocus1() {
    dispatch({
      type: 'search/getAllJournal',
    });
  }

  function handleFocus2() {
    dispatch({
      type: 'search/getAllField',
    });
  }

  const modalOpts = {
    title: '发布论文',
    visible:modalVisible,
    onOk: handleOk,
    onCancel:handleClose,
    wrapClassName: 'vertical-center-modal',
  };

  const options1= _journallist.map(d => <Option key={d.journal_id}>{d.journal_name}</Option>);

  const options2= _fieldlist.map(d => <Option key={d.field_id}>{d.field_name}</Option>);

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="标题：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('paper_title', {
            rules: [
              {
                required: true,
                message: '标题未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="发表年份：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('paper_published_year', {
            rules: [
              {
                required: true,
                type: 'number',
                message: '发表年份未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="发表期刊：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('paper_published_journal_id', {
            rules: [
              {
                required: true,
                message: '发表期刊未填写',
              },
            ],
          })(
            <Select placeholder="请选择"
                    onFocus={handleFocus1}>
              {options1}
            </Select>
          )}
        </FormItem>
        <FormItem label="论文领域：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('paper_field_id', {
            rules: [
              {
                required: true,
                message: '论文领域未填写',
              },
            ],
          })(
            <Select placeholder="请选择"
                    onFocus={handleFocus2}>
              {options2}
            </Select>
          )}
        </FormItem>
        <FormItem label="链接：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('paper_link', {
            rules: [
              {
                required: true,
                message: '论文链接未填写',
              },
            ],
          })(<Input />)}
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
