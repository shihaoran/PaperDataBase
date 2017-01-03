import React, {PropTypes} from 'react'
import {
  Icon,
  message,
  Button,
  Row,
  Col,
  Form,
  Input,
  Select,
  Popover,
  Dropdown,
  Menu,
  Modal,
  Spin,
} from 'antd'
import {config} from '../utils'
import styles from './login.less'
import RegistrationForm from '../components/login/registerform'

const FormItem = Form.Item

const login = ({
  loginButtonLoading,
  loading,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  },
  dispatch,
  regmodal_visible,
  reg_type,
}) => {

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      onOk(values)
    })
  }
  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
    dispatch({type: 'app/showRegModal', payload:e.key});
  }
  function CloseModal() {
    dispatch({type: 'app/hideRegModal'});
  }
  const SubMenu = Menu.SubMenu;
  const menu = (
    <Menu onClick={handleMenuClick}>
      <SubMenu title="用户注册">
        <Menu.Item key="0">普通用户</Menu.Item>
        <Menu.Item key="1">论文作者</Menu.Item>
        <Menu.Item key="2">期刊编辑</Menu.Item>
      </SubMenu>
      <SubMenu title="机构注册">
        <Menu.Item key="3">研究机构</Menu.Item>
        <Menu.Item key="4">学术期刊</Menu.Item>
        <Menu.Item key="5">出版社</Menu.Item>
      </SubMenu>
    </Menu>
  );
  console.log(loading);
  const Common_reg=(
    <Spin tip="加载用户信息..." spinning={loading} size="large">
      <Modal visible={regmodal_visible} onCancel={CloseModal}
             footer={[
               <Button key="back" type="ghost" size="large" onClick={CloseModal}>返回</Button>,
             ]}>
        <RegistrationForm type={reg_type} dispatch={dispatch}/>
      </Modal>
    </Spin>

  );

  document.onkeyup = e => e.keyCode===13 &&  handleOk();

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img src={config.logoSrc}/>
        <span>Power Paper</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('user_name', {
            rules: [
              {
                required: true,
                message: '请填写用户名'
              }
            ]
          })(<Input size="large" placeholder="用户名"/>)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请填写密码'
              }
            ]
          })(<Input size="large" type="password" placeholder="密码"/>)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading={loginButtonLoading}>
            登录
          </Button>
          <Dropdown overlay={menu}>
            <Button size="large" type="ghost" loading={loginButtonLoading}>
              注册 <Icon type="down" />
            </Button>
          </Dropdown>
        </Row>
        <p>
          <span>账号：guest</span>
          <span>密码：guest</span>
        </p>
      </form>
      {Common_reg}
    </div>
  )
}

login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading:PropTypes.bool,
  onOk: PropTypes.func
}

export default Form.create()(login)
