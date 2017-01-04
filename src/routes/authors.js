import React, {PropTypes} from 'react'
import {connect} from 'dva'
import UserSearch from '../components/searchs/search'
import UserList from '../components/operation/authorlist'


function EditAuthors({search,dispatch}) {
  const {
    loading, _authorlist, modalVisible, modalType,
  } = search;

  const userListProps = {
    dataSource: _authorlist,
    loading,
  };

  const userSearchProps = {
    onSearch(fieldsValue) {
      dispatch({
        type: 'search/getAuthor',
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

export default connect(search => search)(EditAuthors)