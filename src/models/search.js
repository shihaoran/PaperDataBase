import { create, queryPaper,queryAuthor,queryAgency,queryJournal,queryPublisher} from '../services/search'
import { parse } from 'qs'

export default {

  namespace: 'search',

  state: {
    paperlist: [],
    authorlist: [],
    agencylist: [],
    journallist: [],
    publisherlist: [],
    loading: false,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {

  },

  effects: {
    *queryPaper({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(queryPaper, JSON.stringify(payload))
      if (data) {
        let a={};
        a.type="0";
        a.data=data;
        yield put({
          type: 'querySuccess',
          payload: a,
        })
      }
    },
    *queryAuthor({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(queryAuthor, JSON.stringify(payload))
      if (data) {
        let a={};
        a.type="1";
        a.data=data;
        yield put({
          type: 'querySuccess',
          payload: a,
        })
      }
    },
    *queryAgency({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(queryAgency, JSON.stringify(payload))
      if (data) {
        let a={};
        a.type="2";
        a.data=data;
        yield put({
          type: 'querySuccess',
          payload: a,
        })
      }
    },
    *queryJournal({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(queryJournal, JSON.stringify(payload))
      if (data) {
        let a={};
        a.type="3";
        a.data=data;
        yield put({
          type: 'querySuccess',
          payload: a,
        })
      }
    },
    *queryPublisher({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(queryPublisher, JSON.stringify(payload))
      if (data) {
        let a={};
        a.type="4";
        a.data=data;
        yield put({
          type: 'querySuccess',
          payload: a,
        })
      }
    },

  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true }
    },
    querySuccess(state, action) {
      console.log(action.payload.data);
      if(action.payload.type=="0")
        return { ...state, paperlist:action.payload.data, loading: false };
      else if(action.payload.type=="1")
        return { ...state, authorlist:action.payload.data, loading: false };
      else if(action.payload.type=="2")
        return { ...state, agencylist:action.payload.data, loading: false };
      else if(action.payload.type=="3")
        return { ...state, journallist:action.payload.data, loading: false };
      else if(action.payload.type=="4")
        return { ...state, publisherlist:action.payload.data, loading: false };
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },

}
