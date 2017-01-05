import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {Link} from 'dva/router'
import {Row, Col, Icon, Card} from 'antd'
import NumberCard from '../components/dashboard/numberCard'
import Quote from '../components/dashboard/quote'
import Sales from '../components/dashboard/sales'
import Weather from '../components/dashboard/weather'
import RecentSales from '../components/dashboard/recentSales'
import Comments from '../components/dashboard/comments'
import Completed from '../components/dashboard/completed'
import Browser from '../components/dashboard/browser'
import Cpu from '../components/dashboard/cpu'
import User from '../components/dashboard/user'
import styles from './dashboard.less'
import {color} from '../utils'

const bodyStyle = {
  bodyStyle:{
    height: 432,
    background: '#fff',
  }
}

function Dashboard({search,dispatch}) {

  const {dashboard} = search;

  return (
    <Row gutter={32}>
      <Col span={8}>
        <NumberCard icon="file-text"
                    color={color.green}
                    title="论文"
                    number={dashboard.paper_num}
        />
      </Col>
      <Col span={8}>
        <NumberCard icon="user"
                    color={color.blue}
                    title="作者"
                    number={dashboard.author_num}
        />
      </Col>
      <Col span={8}>
        <NumberCard icon="book"
                    color={color.peach}
                    title="期刊"
                    number={dashboard.journal_num}
        />
      </Col>
      <Col span={8}>
        <NumberCard icon="aliwangwang"
                    color={color.yellow}
                    title="编辑"
                    number={dashboard.editor_num}
        />
      </Col>
      <Col span={8}>
        <NumberCard icon="switcher"
                    color={color.sky}
                    title="出版社"
                    number={dashboard.publisher_num}
        />
      </Col>
      <Col span={8}>
        <NumberCard icon="team"
                    color={color.grass}
                    title="科研机构"
                    number={dashboard.agency_num}
        />
      </Col>
      <Col span={12}>
        <NumberCard icon="file-unknown"
                    color={color.purple}
                    title="待审核论文"
                    number={dashboard.examine_num}
        />
      </Col>
      <Col span={12}>
        <NumberCard icon="cloud"
                    color={color.blue}
                    title="科研领域"
                    number={14}
        />
      </Col>
    </Row>
  )
}


export default connect(({search}) => ({search}))(Dashboard)
