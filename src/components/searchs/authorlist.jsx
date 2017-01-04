import React, { PropTypes } from 'react'
import { Table, Popconfirm, Pagination } from 'antd'
import styles from './list.less'

function list({
  loading,
  dataSource,
}) {
  const columns = [
    {
      title: '作者编号',
      dataIndex: 'author_id',
      key: 'author_id',
    }, {
      title: '姓名',
      dataIndex: 'author_name',
      key: 'author_name',
    }, {
      title: '性别',
      dataIndex: 'author_sex',
      key: 'author_sex',
    }, {
      title: '出生年份',
      dataIndex: 'author_birth',
      key: 'author_birth',
    }, {
      title: '论文数量',
      dataIndex: 'author_paper_num',
      key: 'author_paper_num',
    }, {
      title: '所属机构',
      dataIndex: 'author_agency',
      key: 'author_agency',
    },{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <p>
          <a onClick={() => onEditItem(record)} style={{
            marginRight: 4,
          }}>编辑</a>
          <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
            <a>删除</a>
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
