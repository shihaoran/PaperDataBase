import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {Link} from 'dva/router'
import {Row, Col, Icon, Card,Button,Form} from 'antd'
import UserSearch from '../components/searchs/search'
import UserList from '../components/searchs/list'
import {color} from '../utils'


function SearchAgency({search,dispatch}) {
  const {
    loading, list, modalVisible, modalType,
  } = search;

  const userListProps = {
    dataSource: list,
    loading,
  };

  const userSearchProps = {
    onSearch(fieldsValue) {
      dispatch({
        type: 'search/query',
        payload: fieldsValue,
      })
    },
  };
  return (
    <div className="content-inner">
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
    </div>
  )
}

export default connect(search => search)(SearchAgency)