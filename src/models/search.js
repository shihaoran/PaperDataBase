import { create, remove, update, query } from '../services/search'
import { parse } from 'qs'

export default {

  namespace: 'search',

  state: {
    list: [],
    loading: false,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {

  },

  effects: {
    *query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(query, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: data.data,
        })
      }
    },

  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true }
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false }
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },

}
