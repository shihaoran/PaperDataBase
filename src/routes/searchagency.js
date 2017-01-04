import React, {PropTypes} from 'react'
import {connect} from 'dva'
import UserSearch from '../components/searchs/search'
import UserList from '../components/searchs/agencylist'


function SearchAgency({search,dispatch}) {
  const {
    loading, agencylist, modalVisible, modalType,
  } = search;

  const userListProps = {
    dataSource: agencylist,
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

export default connect(search => search)(SearchAgency)