import React, {PropTypes} from 'react'
import {connect} from 'dva'
import UserSearch from '../components/searchs/search'
import UserList from '../components/operation/editorlist'
import SetModal from '../components/operation/setsalarymodal'


function EditSalary({search,dispatch}) {
  const {
    loading, _editorlist, modalVisible, modalType,
  } = search;

  const userListProps = {
    dataSource: _editorlist,
    onEditItem(fieldsValue) {
      dispatch({
        type: 'search/setCurItem',
        payload: fieldsValue,
      });
      dispatch({type: 'search/showModal'});
    },
    loading,
  };

  const userSearchProps = {
    onSearch(fieldsValue) {
      dispatch({
        type: 'search/getEditor',
      })
    },
  };
  return (
    <div className="content-inner">
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
      <SetModal/>
    </div>
  )
}

export default connect(search => search)(EditSalary)