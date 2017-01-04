import React, { PropTypes } from 'react'
import { Table, Popconfirm, Pagination } from 'antd'
import styles from './list.less'

function list({
  loading,
  dataSource,
  onEditItem,
}) {
  const columns = [
    {
      title: '编辑编号',
      dataIndex: 'editor_id',
      key: 'editor_id',
    }, {
      title: '姓名',
      dataIndex: 'editor_name',
      key: 'editor_name',
    }, {
      title: '审核论文数',
      dataIndex: 'editor_examinepaper_num',
      key: 'editor_examinepaper_num',
    }, {
      title: '工资',
      dataIndex: 'editor_salary',
      key: 'editor_salary',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <p>
          <a onClick={() => onEditItem(record)} style={{
            marginRight: 4,
          }}>修改工资</a>
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
