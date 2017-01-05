import React, {PropTypes} from 'react'
import {connect} from 'dva'
import UserSearch from '../components/searchs/search'
import List from '../components/operation/userlist'


function UserList({search,dispatch}) {
  const {
    loading, _userlist, modalVisible, modalType,
  } = search;

  const userListProps = {
    dataSource: _userlist,
    loading,
  };

  const userSearchProps = {
    onSearch(fieldsValue) {
      dispatch({
        type: 'search/getUserList',
        payload: fieldsValue.keyword,
      })
    },
  };
  return (
    <div className="content-inner">
      <UserSearch {...userSearchProps} />
      <List {...userListProps} />
    </div>
  )
}

export default connect(search => search)(UserList)