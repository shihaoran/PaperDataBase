import React, {PropTypes} from 'react'
import {connect} from 'dva'
import UserSearch from '../components/searchs/search'
import UserList from '../components/operation/journallist'


function EditJournal({search,dispatch}) {
  const {
    loading, _journallist, modalVisible, modalType,
  } = search;

  const userListProps = {
    dataSource: _journallist,
    loading,
  };

  const userSearchProps = {
    onSearch(fieldsValue) {
      dispatch({
        type: 'search/getJournal',
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

export default connect(search => search)(EditJournal)