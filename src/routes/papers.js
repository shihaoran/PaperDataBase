import React, {PropTypes} from 'react'
import {connect} from 'dva'
import UserSearch from '../components/operation/search'
import UserList from '../components/operation/mypaperlist'
import AddModal from '../components/operation/addpapermodal'


function MyPaper({search,dispatch}) {
  const {
    loading, _examinepaperlist, modalVisible, modalType,
  } = search;

  const userListProps = {
    dataSource: _examinepaperlist,
    loading,
  };

  const userSearchProps = {
    onAdd()
    {
      dispatch({type: 'search/showModal',});
    },
    onSearch(fieldsValue) {
      dispatch({
        type: 'search/getmyPaper',
        payload: fieldsValue,
      })
    },
  };
  return (
    <div className="content-inner">
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
      <AddModal/>
    </div>
  )
}

export default connect(search => search)(MyPaper)