/**
 * Created by shi on 2017/1/3.
 */
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Radio,
} from 'antd';
import React, { Component } from 'react';
import {connect} from 'dva'
import { fetchhttp } from '../../utils'

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends Component{
  constructor(props) {
    // 继承父类的this对象和传入的外部属性
    super(props);
    // 设置初始状态
    this.state = {
      passwordDirty: false,
      data:[],
      focus:false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
    this.fetchOptions = this.fetchOptions.bind(this);
    this.handleFocus =this.handleFocus.bind(this);
    //this.getList = this.getList.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let result={};
        result.user_name=values.username;
        result.password=values.password;
        result.type=this.props.type;
        if(this.props.type === '1')
        {
          result.author_name=values.nickname;
          result.author_sex=values.isMale;
          result.author_email=values.email;
          result.author_birth=values.birth;
          result.author_agency_id=values.place_id;
        }
        else if(this.props.type === '2')
        {
          result.editor_name=values.nickname;
          result.edit_journal_id=values.place_id;
        }
        else if(this.props.type === '3')
        {
          result.agency_name=values.nickname;
          result.agency_property =values.type;
          result.agency_address=values.address;
          result.agency_country=values.country;
        }
        else if(this.props.type === '4')
        {
          result.journal_name=values.nickname;
          result.journal_content=values.intro;
          result.journal_creation_time=values.foundyear;
          result.journal_publisher_id=values.place_id;
          result.journal_country=values.country;
        }
        else if(this.props.type === '5')
        {
          result.publisher_name=values.nickname;
          result.publisher_country=values.country;
          result.publisher_center=values.address;
        }
        console.log(result);
        this.props.dispatch({type: 'app/register', payload: result});
      }
    });
  }
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  }
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  fetchOptions(data){
    let ddd=[];
    data.map((d,i)=>{
      let a={};
      console.log(d);
      if(this.props.type === '1')
      {
        a.value=d.agency_id;
        a.key=d.agency_name;
      }
      else if(this.props.type === '2')
      {
        a.value=d.journal_id;
        a.key=d.journal_name;
      }
      else if(this.props.type === '4')
      {
        a.value=d.publisher_id;
        a.key=d.publisher_name;
      }
      ddd[i]=a;
    });
    this.setState({data:ddd});
  }
  handleFocus() {
    this.setState({ focus: true });
    let url="";
    if(this.props.type === '1')
      url="getAgencyList/";
    else if(this.props.type === '2')
      url="getJournalList/";
    else if(this.props.type === '4')
      url="getPublisherList/";
    let value="";
    if(this.props.type === '2')
      value="-1";
    console.log(url);
    fetchhttp(url,value,()=>{},this.fetchOptions);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    );
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
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
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" onBlur={this.handlePasswordBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请再次输入密码!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(this.props.type === '0'||this.props.type === '1'||this.props.type === '2')?"真实姓名":"机构名称"}
          hasFeedback
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入姓名或名称!' }],
          })(
            <Input />
          )}
        </FormItem>
        {this.props.type === '1'?
          <FormItem label="性别" hasFeedback {...formItemLayout}>
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
        {this.props.type === '1'?
          <FormItem label="学历" hasFeedback {...formItemLayout}>
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
        {this.props.type === '1'?
          <FormItem
            {...formItemLayout}
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
        {this.props.type === '1'?
          <FormItem
            {...formItemLayout}
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
        {this.props.type === '4'?
          <FormItem label="期刊简介" hasFeedback {...formItemLayout}>
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
        {this.props.type === '4'?
          <FormItem label="成立时间" hasFeedback {...formItemLayout}>
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
        {(this.props.type === '1'||this.props.type === '2'||this.props.type === '4')?
          <FormItem label={this.props.type === '1'?"隶属研究机构":
                            this.props.type === '2'?"隶属期刊":"隶属出版社"}
                    hasFeedback
                    {...formItemLayout}>
            {getFieldDecorator('place_id', {
              rules: [
                {
                  required: true,
                  message: '请选择!',
                },
              ],
            })(
              <Select placeholder="请选择"
                      onFocus={this.handleFocus}>
                {options}
              </Select>
            )}
          </FormItem>
          :<div/>
        }
        {this.props.type === '3'?
          <FormItem label="机构性质"
                    hasFeedback
                    {...formItemLayout}>
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
        {(this.props.type === '3'||this.props.type === '4'||this.props.type === '5')?
          <FormItem label="所在国家"
                    hasFeedback
                    {...formItemLayout}>
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
        {(this.props.type === '3'||this.props.type === '5')?
          <FormItem label="地址"
                    hasFeedback
                    {...formItemLayout}>
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
        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
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
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large" onClick={()=>{}}>Register</Button>
        </FormItem>
      </Form>
    );
  }
}

export default connect(({app}) => ({app}))(Form.create()(RegistrationForm));