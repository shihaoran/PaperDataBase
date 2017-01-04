import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal, Select, Tooltip, Icon, Checkbox} from 'antd'
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
  app,
  dispatch,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    validateFieldsAndScroll,
  },
}) => {
  const {
    reg_type, regmodal_visible, Optlist, passwordDirty, modalVisible, modalType,
  } = app;

  function handleClose() {
    dispatch({
      type: 'app/hideRegModal',
    });
  }

  function handleFocus() {
    let url="";
    if(reg_type === '1')
      url="getAgencyList/";
    else if(reg_type === '2')
      url="getJournalList/";
    else if(reg_type === '4')
      url="getPublisherList/";
    dispatch({type: 'app/fetchOption', payload: url});
  }

  function handleSubmit(e) {
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let result={};
        result.user_name=values.username;
        result.password=values.password;
        result.type=reg_type;
        if(reg_type === '1')
        {
          result.author_name=values.nickname;
          result.author_sex=(values.isMale?"M":"F");
          result.author_email=values.email;
          result.author_birth=values.birth;
          result.author_agency_id=values.place_id;
        }
        else if(reg_type === '2')
        {
          result.editor_name=values.nickname;
          result.editor_journal_id=values.place_id;
        }
        else if(reg_type === '3')
        {
          result.agency_name=values.nickname;
          result.agency_property =values.type;
          result.agency_address=values.address;
          result.agency_country=values.country;
        }
        else if(reg_type === '4')
        {
          result.journal_name=values.nickname;
          result.journal_content=values.intro;
          result.journal_creation_time=values.foundyear;
          result.journal_publisher_id=values.place_id;
          result.journal_country=values.country;
        }
        else if(reg_type === '5')
        {
          result.publisher_name=values.nickname;
          result.publisher_country=values.country;
          result.publisher_center=values.address;
        }
        console.log(result);
        dispatch({type: 'app/register', payload: result});
      }
    });
  }
  function handlePasswordBlur(e) {
    const value = e.target.value;
    dispatch({type: 'app/setpasswordDirty', payload: (passwordDirty || !!value)});
  }

  function checkConfirm(rule, value, callback) {
    if (value && passwordDirty) {
      validateFields(['confirm'], { force: true });
    }
    callback();
  }
  const modalOpts = {
    title: '注册',
    visible:regmodal_visible,
    onOk: handleSubmit,
    onCancel:handleClose,
    wrapClassName: 'vertical-center-modal',
  };

  const options= Optlist.map((d) =>{
    if(reg_type === '1') {
      return (<Option key={d.agency_id}>{d.agency_name}</Option>);
    }
    else if(reg_type === '2')
    {
      return (<Option key={d.journal_id}>{d.journal_name}</Option>);
    }
    else if(reg_type === '4')
    {
      return (<Option key={d.publisher_id}>{d.publisher_name}</Option>);
    }
    
  });
  
  return (
    <Modal {...modalOpts}>
      <Form horizontal onSubmit={handleSubmit}>
        <FormItem
          label={(
            <span>
              用户名&nbsp;
              <Tooltip title="您用来登录的用户名">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: '请输入用户名!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
            }],
          })(
            <Input type="password" onBlur={handlePasswordBlur} />
          )}
        </FormItem>
        <FormItem
          label={(reg_type === '0'||reg_type === '1'||reg_type === '2')?"真实姓名":"机构名称"}
          hasFeedback
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入姓名或名称!' }],
          })(
            <Input />
          )}
        </FormItem>
        {reg_type === '1'?
          <FormItem label="性别" hasFeedback >
            {getFieldDecorator('isMale', {
              initialValue: true,
              rules: [
                {
                  required: true,
                  type: 'boolean',
                  message: '请选择性别',
                },
              ],
            })(
              <Radio.Group>
                <Radio value>男</Radio>
                <Radio value={false}>女</Radio>
              </Radio.Group>
            )}
          </FormItem>
          :<div/>
        }
        {reg_type === '1'?
          <FormItem label="学历" hasFeedback >
            {getFieldDecorator('degree', {
              rules: [
                {
                  required: true,
                  message: '请选择学历!',
                },
              ],
            })(
              <Select placeholder="请选择学历">
                <Option value="doctor">博士</Option>
                <Option value="master">硕士</Option>
                <Option value="bachelor">本科</Option>
                <Option value="highschool">高中</Option>
                <Option value="middleschool">初中</Option>
                <Option value="primaryschool">小学</Option>
              </Select>
            )}
          </FormItem>
          :<div/>
        }
        {reg_type === '1'?
          <FormItem
            label="email"
            hasFeedback
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: '请输入符合规则的电子邮件地址!',
              }, {
                required: true, message: '请输入电子邮件!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          :<div/>
        }
        {reg_type === '1'?
          <FormItem
            label="出生年份"
            hasFeedback
          >
            {getFieldDecorator('birth', {
              rules: [ {
                required: true, message: '请输入出生年份!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          :<div/>
        }
        {reg_type === '4'?
          <FormItem label="期刊简介" hasFeedback >
            {getFieldDecorator('intro', {
              rules: [
                {
                  required: true,
                  message: '请输入期刊简介',
                },
              ],
            })(
              <Input />
            )}
          </FormItem>
          :<div/>
        }
        {reg_type === '4'?
          <FormItem label="成立时间" hasFeedback >
            {getFieldDecorator('foundyear', {
              rules: [
                {
                  required: true,
                  message: '请输入成立时间(年)',
                },
              ],
            })(
              <Input />
            )}
          </FormItem>
          :<div/>
        }
        {(reg_type === '1'||reg_type === '2'||reg_type === '4')?
          <FormItem label={reg_type === '1'?"隶属研究机构":
            reg_type === '2'?"隶属期刊":"隶属出版社"}
                    hasFeedback
                    >
            {getFieldDecorator('place_id', {
              rules: [
                {
                  required: true,
                  message: '请选择!',
                },
              ],
            })(
              <Select placeholder="请选择"
                      onFocus={handleFocus}>
                {options}
              </Select>
            )}
          </FormItem>
          :<div/>
        }
        {reg_type === '3'?
          <FormItem label="机构性质"
                    hasFeedback
                    >
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: '请选择机构性质!',
                },
              ],
            })(
              <Select placeholder="请选择机构性质">
                <Option value="university">大学</Option>
                <Option value="company">公司</Option>
                <Option value="institute">科研院所</Option>
              </Select>
            )}
          </FormItem>
          :<div/>
        }
        {(reg_type === '3'||reg_type === '4'||reg_type === '5')?
          <FormItem label="所在国家"
                    hasFeedback
                    >
            {getFieldDecorator('country', {
              rules: [
                {
                  required: true,
                  message: '请输入所在国家!',
                },
              ],
            })(
              <Input />
            )}
          </FormItem>
          :<div/>
        }
        {(reg_type === '3'||reg_type === '5')?
          <FormItem label="地址"
                    hasFeedback
                    >
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: '请输入所在地址!',
                },
              ],
            })(
              <Input />
            )}
          </FormItem>
          :<div/>
        }
        <FormItem style={{ marginBottom: 8 }}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
            rules: [
              {
                required: true,
                message: '请确认已阅读!',
              },
            ],
          })(
            <Checkbox>我已阅读用户协议</Checkbox>
          )}
        </FormItem>

      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default connect(({app}) => ({app}))(Form.create()(modal));
