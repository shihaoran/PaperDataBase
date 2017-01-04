/**
 * Created by shi on 2017/1/4.
 */
import React, {PropTypes} from 'react'
import {connect} from 'dva'
import UserSearch from '../components/searchs/search'
import UserList from '../components/searchs/authorlist'


function SearchAuthor({search,dispatch}) {
  const {
    loading, authorlist, modalVisible, modalType,
  } = search;

  const userListProps = {
    dataSource: authorlist,
    loading,
  };

  const userSearchProps = {
    onSearch(fieldsValue) {
      dispatch({
        type: 'search/queryAuthor',
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

export default connect(search => search)(SearchAuthor)