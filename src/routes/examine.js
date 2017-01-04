import React, {PropTypes} from 'react'
import {connect} from 'dva'
import UserSearch from '../components/searchs/search'
import UserList from '../components/operation/examinepaperlist'


function ExaminePaper({search,dispatch}) {
  const {
    loading, _examinepaperlist, modalVisible, modalType,
  } = search;

  const userListProps = {
    dataSource: _examinepaperlist,
    loading,
  };

  const userSearchProps = {
    onSearch(fieldsValue) {
      dispatch({
        type: 'search/getexaminePaper',
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

export default connect(search => search)(ExaminePaper)