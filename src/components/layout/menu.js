import React, { PropTypes } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import styles from './main.less'
import { menu } from '../../utils'

var u_type="0";

const topMenus = menu.map( item => item.key)
const getMenus = function (menuArray,siderFold,parentPath) {
  parentPath = parentPath || '/';
  return menuArray.map(item => {
    if(item.key=="users"&&u_type=="0")
    {
      return;
    }
    if(item.key=="examine"&&u_type!="2")
    {
      return;
    }
    if(item.key=="papers"&&u_type!="1")
    {
      return;
    }
    if(item.key=="salary"&&u_type!="4")
    {
      return;
    }
    if(item.key=="authors"&&u_type!="3")
    {
      return;
    }
    if(item.key=="journals"&&u_type!="5")
    {
      return;
    }
    if (!!item.child) {
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold&&topMenus.indexOf(item.key)>=0 ? '' : item.name}</span>}>
          {getMenus(item.child,siderFold,parentPath + item.key + '/')}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key}>
            {item.icon ? <Icon type={item.icon} /> : ''}
            {siderFold&&topMenus.indexOf(item.key)>=0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
};

function Menus({ siderFold,darkTheme,location,isNavbar,user_type }) {
  u_type=user_type;
  const menuItems = getMenus(menu,siderFold);
  return (
  <Menu
    mode={siderFold?"vertical":"inline"}
    theme={darkTheme?"dark":"light"}
    defaultOpenKeys={isNavbar?menuItems.map(item => item.key):[]}
    defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1]||'dashboard']}>
    {menuItems}
  </Menu>
  )
}

export default Menus
