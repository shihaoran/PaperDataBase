/**
 * Created by shi on 2017/1/4.
 */
import React, {PropTypes} from 'react'
import {connect} from 'dva'
import UserSearch from '../components/searchs/search'
import UserList from '../components/searchs/paperlist'


function SearchPaper({search,dispatch}) {
  const {
    loading, paperlist, modalVisible, modalType,
  } = search;

  const userListProps = {
    dataSource: paperlist,
    loading,
  };

  const userSearchProps = {
    onSearch(fieldsValue) {
      dispatch({
        type: 'search/queryPaper',
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

export default connect(search => search)(SearchPaper)