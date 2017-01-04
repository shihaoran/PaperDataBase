import React from 'react'
import {Router} from 'dva/router'
import App from './routes/app'

export default function ({history, app}) {

  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          cb(null, {component: require('./routes/dashboard')})
        })
      },
      childRoutes: [
        {
          path: 'dashboard',
          name: 'dashboard',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/dashboard'))
            })
          }
        }, {
          path: 'users',
          name: 'users',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/users'))
            })
          }
        }, {
          path: 'ui/ico',
          name: 'ui/ico',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/ico'))
            })
          }
        }, {
          path: 'search/paper',
          name: 'paper',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/searchpaper'))
            })
          }
        },{
          path: 'search/author',
          name: 'author',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/searchauthor'))
            })
          }
        },{
          path: 'search/agency',
          name: 'agency',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/searchagency'))
            })
          }
        },{
          path: 'search/journal',
          name: 'journal',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/searchjournal'))
            })
          }
        },{
          path: 'search/publisher',
          name: 'publisher',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/searchpublisher'))
            })
          }
        },{
          path: '*',
          name: 'error',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error'))
            })
          }
        }
      ]
    }
  ]

  return <Router history={history} routes={routes}/>
}
