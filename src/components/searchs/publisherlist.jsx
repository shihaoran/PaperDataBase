import React, { PropTypes } from 'react'
import { Table, Popconfirm, Pagination } from 'antd'
import styles from './list.less'

function list({
  loading,
  dataSource,
}) {
  const columns = [
    {
      title: '出版社编号',
      dataIndex: 'publisher_id',
      key: 'publisher_id',
    }, {
      title: '名称',
      dataIndex: 'publisher_name',
      key: 'publisher_name',
    }, {
      title: '国家',
      dataIndex: 'publisher_country',
      key: 'publisher_country',
    }, {
      title: '地址',
      dataIndex: 'publisher_address',
      key: 'publisher_address',
    }, {
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
