import React, { PropTypes } from 'react'
import { Table, Popconfirm, Pagination } from 'antd'
import styles from './list.less'

function list({
  loading,
  dataSource,
  onItem,
}) {
  const columns = [
    {
      title: '论文编号',
      dataIndex: 'paper_id',
      key: 'paper_id',
    }, {
      title: '标题',
      dataIndex: 'paper_title',
      key: 'paper_title',
    },{
      title: '作者',
      dataIndex: 'paper_author',
      key: 'paper_author',
    },{
      title: '出版时间',
      dataIndex: 'paper_published_year',
      key: 'paper_published_year',
    },{
      title: '期刊',
      dataIndex: 'paper_published_journal',
      key: 'paper_published_journal',
    },{
      title: '领域',
      dataIndex: 'paper_field',
      key: 'paper_field',
    },{
      title: '链接',
      dataIndex: 'paper_link',
      key: 'paper_link',
    },{
      title: '论文状态',
      dataIndex: 'paper_type',
      key: 'paper_type',
      render: (text) => {
        if(text=="0")
          return(<span>待审核</span>);
        else if(text=="1")
          return(<span>审核通过</span>);
        else if(text=="2")
          return(<span>审核失败</span>);
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <p>
          <Popconfirm title="确定要通过吗？" onConfirm={() => onItem(record.paper_id,"0")}>
            <a style={{marginRight: 4,}}>通过</a>
          </Popconfirm>
          <Popconfirm title="确定要退回吗？" onConfirm={() => onItem(record.paper_id,"0")}>
            <a>不通过</a>
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
