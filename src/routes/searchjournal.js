/**
 * Created by shi on 2017/1/4.
 */
import React, {PropTypes} from 'react'
import {connect} from 'dva'
import UserSearch from '../components/searchs/search'
import UserList from '../components/searchs/journallist'


function SearchJournal({search,dispatch}) {
  const {
    loading, journallist, modalVisible, modalType,
  } = search;

  const userListProps = {
    dataSource: journallist,
    loading,
  };

  const userSearchProps = {
    onSearch(fieldsValue) {
      dispatch({
        type: 'search/queryJournal',
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

export default connect(search => search)(SearchJournal)