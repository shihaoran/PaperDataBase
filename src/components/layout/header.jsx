import React, {PropTypes} from 'react'
import {Menu, Icon, Popover} from 'antd'
import {Link} from 'dva/router'
import styles from './main.less'
import Menus from './menu'

const SubMenu = Menu.SubMenu

function Header({user_name,user_type, logout, switchSider, siderFold, isNavbar ,location}) {
  let handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    siderFold:false,
    darkTheme:false,
    isNavbar,
    location
  }
  function onMenu(item, key, keyPath) {
    if(item.key==="logout")
    {
      logout();
    }
  }
  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover placement="bottomLeft" overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps}/>}>
          <div className={styles.siderbutton}>
            <Icon type="bars"/>
          </div>
        </Popover>
        : <div className={styles.siderbutton} onClick={switchSider}>
          <Icon type={siderFold? 'menu-unfold': 'menu-fold'}/>
        </div>}

      <Menu className="header-menu" mode="horizontal" onClick={onMenu}>
        <SubMenu style={{
          float: 'right'
        }} title={< span > <Icon type="user"/>
          {user_name} </span>}>
          <Menu.Item key="type" >
            {user_type==="0"?"普通用户":
              user_type==="1"?"作者用户":
                user_type==="2"?"编辑用户":
                  user_type==="3"?"科研机构用户":
                    user_type==="4"?"期刊用户":"出版社用户"}
          </Menu.Item>
          <Menu.Item key="logout" >
            <a>注销</a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default Header
