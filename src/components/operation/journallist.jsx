import React, { PropTypes } from 'react'
import { Table, Popconfirm, Pagination } from 'antd'
import styles from './list.less'

function list({
  loading,
  dataSource,
}) {
  const columns = [
    {
      title: '期刊编号',
      dataIndex: 'journal_id',
      key: 'journal_id',
    }, {
      title: '名称',
      dataIndex: 'journal_name',
      key: 'journal_name',
    }, {
      title: '创建时间',
      dataIndex: 'journal_creation_time',
      key: 'journal_creation_time',
    }, {
      title: '国家',
      dataIndex: 'journal_country',
      key: 'journal_country',
    }, {
      title: '简介',
      dataIndex: 'journal_content',
      key: 'journal_content',
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
