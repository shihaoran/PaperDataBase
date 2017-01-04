import React, {PropTypes} from 'react'
import {connect} from 'dva'
import UserSearch from '../components/searchs/search'
import UserList from '../components/operation/editorlist'


function EditSalary({search,dispatch}) {
  const {
    loading, _editorlist, modalVisible, modalType,
  } = search;

  const userListProps = {
    dataSource: _editorlist,
    loading,
  };

  const userSearchProps = {
    onSearch(fieldsValue) {
      dispatch({
        type: 'search/queryAgency',
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

export default connect(search => search)(EditSalary)