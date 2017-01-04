import React, { PropTypes } from 'react'
import { Table, Popconfirm, Pagination } from 'antd'
import styles from './list.less'

function list({
  loading,
  dataSource,
}) {
  const columns = [
    {
      title: '机构编号',
      dataIndex: 'agency_id',
      key: 'agency_id',
    }, {
      title: '国家',
      dataIndex: 'agency_country',
      key: 'agency_country',
    }, {
      title: '地址',
      dataIndex: 'agency_address',
      key: 'agency_address',
    }, {
      title: '名称',
      dataIndex: 'agency_name',
      key: 'agency_name',
    }, {
      title: '性质',
      dataIndex: 'agency_property',
      key: 'agency_property',
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
