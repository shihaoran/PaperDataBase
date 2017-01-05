import React, { PropTypes } from 'react'
import { Table, Popconfirm, Pagination } from 'antd'
import styles from './list.less'

function list({
  loading,
  dataSource,
}) {
  const columns = [
    {
      title: '用户编号',
      dataIndex: 'user_id',
      key: 'user_id',
    }, {
      title: '用户登录名',
      dataIndex: 'user_name',
      key: 'user_name',
    }, {
      title: '用户类型',
      dataIndex: 'user_type',
      key: 'user_type',
      render: (text) => {
        if(text=="0")
          return(<span>普通用户</span>);
        else if(text=="1")
          return(<span>论文作者</span>);
        else if(text=="2")
          return(<span>期刊编辑</span>);
        else if(text=="3")
          return(<span>科研机构</span>);
        else if(text=="4")
          return(<span>学术期刊</span>);
        else if(text=="5")
          return(<span>出版社</span>);
        else if(text=="6")
          return(<span>管理员</span>);
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <p>
          <Popconfirm title="确定要查看吗？" onConfirm={() => {console.log(text);}}>
            <a>查看</a>
          </Popconfirm>
        </p>
      ),
    },
  ]

  return (
    <div>
      <Table
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}


export default list
