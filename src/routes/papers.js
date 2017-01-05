import React, {PropTypes} from 'react'
import {connect} from 'dva'
import UserSearch from '../components/operation/search'
import UserList from '../components/operation/mypaperlist'
import AddModal from '../components/operation/addpapermodal'
import EditModal from '../components/operation/editpapermodal'


function MyPaper({search,dispatch}) {
  const {
    loading, _examinepaperlist, modalVisible, modalType,
  } = search;

  const userListProps = {
    dataSource: _examinepaperlist,
    loading,
    onDeleteItem(item){
      dispatch({
        type: 'search/delPaper',
        payload: {paper_id:item.paper_id},
      })
    },
    onEditItem(item){
      dispatch({type: 'search/showeditModal',payload:item,});
    }
  };

  const userSearchProps = {
    onAdd()
    {
      dispatch({type: 'search/showModal',});
    },
    onSearch(fieldsValue) {
      dispatch({
        type: 'search/getmyPaper',
        payload: fieldsValue.keyword,
      })
    },
  };
  return (
    <div className="content-inner">
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
      <AddModal/>
      <EditModal/>
    </div>
  )
}

export default connect(search => search)(MyPaper)