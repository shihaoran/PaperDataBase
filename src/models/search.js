import { create,
  queryPaper,
  queryAuthor,
  queryAgency,
  queryJournal,
  queryPublisher,
  getexaminePaper,
  getmyPaper,
  getAuthor,
  getEditor,
  getJournal,
  getField,
  addPaper,
  delPaper,
  editPaper,
  setSalary,
  examinePaper,
  getDataBaseInfo,
} from '../services/search'
import { parse } from 'qs'

export default {

  namespace: 'search',

  state: {
    user_id:"-2",
    paperlist: [],
    authorlist: [],
    agencylist: [],
    journallist: [],
    publisherlist: [],
    _examinepaperlist:[],
    _authorlist:[],
    _journallist:[],
    _editorlist:[],
    _fieldlist:[],
    loading: false,
    dashboard:{},
    currentItem: {},
    modalVisible: false,
    editmodalVisible:false,
    modalType: 'create',
    edititem:{},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/users/examine') {
          dispatch({
            type: 'getexaminePaper',
          })
        }
        else if (location.pathname === '/users/papers') {
          dispatch({
            type: 'getmyPaper',
          })
        }
        else if (location.pathname === '/users/salary') {
          dispatch({
            type: 'getEditor',
          })
        }
        else if (location.pathname === '/users/authors') {
          dispatch({
            type: 'getAuthor',
          })
        }
        else if (location.pathname === '/users/journals') {
          dispatch({
            type: 'getJournal',
          })
        }
        else if (location.pathname === '/dashboard') {
          dispatch({
            type: 'getDataBaseInfo',
          })
        }
        dispatch({
          type: 'copyUserid',
        })
      })
    },
  },

  effects: {
    *getDataBaseInfo({ payload }, { call, put, select}) {
      yield put({ type: 'showLoading' });
      const data = yield call(getDataBaseInfo, "");
      console.log(data);
      if (data) {
        yield put({
          type: 'setDataBaseInfo',
          payload:data,
        })
      }
      yield put({
        type: 'hideLoading',
      })
    },
    *copyUserid({ payload }, { call, put, select}) {
      const app = yield select(state => state.app);
      yield put({ type: 'setUserid' ,payload:app.user_id});
    },
    *addPaper({ payload }, { call, put, select}) {
      yield put({ type: 'showLoading' });
      const data = yield call(addPaper, JSON.stringify(payload));
      console.log(data);
      if (data) {
        yield put({
          type: 'getmyPaper',
        })
      }
      yield put({
        type: 'hideLoading',
      })
    },
    *editPaper({ payload }, { call, put, select}) {
      yield put({ type: 'showLoading' });
      const data = yield call(editPaper, JSON.stringify(payload));
      console.log(data);
      if (data) {
        yield put({
          type: 'getmyPaper',
        })
      }
      yield put({
        type: 'hideLoading',
      })
    },
    *delPaper({ payload }, { call, put, select}) {
      yield put({ type: 'showLoading' });
      const data = yield call(delPaper, JSON.stringify(payload));
      console.log(data);
      if (data) {
        yield put({
          type: 'getmyPaper',
        })
      }
      yield put({
        type: 'hideLoading',
      })
    },
    *setSalary({ payload }, { call, put, select}) {
      yield put({ type: 'showLoading' });
      const data = yield call(setSalary, JSON.stringify(payload));
      if (data) {
        yield put({
          type: 'getEditor',
        });
      }
      yield put({
        type: 'hideLoading',
      })
    },
    *examinePaper({ payload }, { call, put, select}) {
      yield put({ type: 'showLoading' });
      const data = yield call(examinePaper, JSON.stringify(payload));
      if (data) {
        yield put({
          type: 'getexaminePaper',
        });
      }
      yield put({
        type: 'hideLoading',
      })
    },
    *getexaminePaper({ payload }, { call, put, select}) {
      yield put({ type: 'showLoading' });
      const app = yield select(state => state.app);
      let a={};
      a.journal_id=app.user_journal_id;
      console.log(a);
      const data = yield call(getexaminePaper, JSON.stringify(a));
      if (data) {
        let a={};
        a.type="0";
        a.data=data;
        yield put({
          type: 'getSuccess',
          payload: a,
        })
      }
    },
    *getmyPaper({ payload }, { call, put, select}) {
      yield put({ type: 'showLoading' });
      const app = yield select(state => state.app);
      const a={"author_id":app.user_id};
      const data = yield call(getmyPaper, JSON.stringify(a));
      if (data) {
        let a={};
        a.type="1";
        a.data=data;
        yield put({
          type: 'getSuccess',
          payload: a,
        })
      }
    },
    *getAuthor({ payload }, { call, put, select}) {
      yield put({ type: 'showLoading' });
      const app = yield select(state => state.app);
      const a={"agency_id":app.user_id};
      const data = yield call(getAuthor, JSON.stringify(a));
      if (data) {
        let a={};
        a.type="2";
        a.data=data;
        yield put({
          type: 'getSuccess',
          payload: a,
        })
      }
    },
    *getEditor({ payload }, { call, put, select}) {
      yield put({ type: 'showLoading' });
      const app = yield select(state => state.app);
      const a={"journal_id":app.user_id};
      const data = yield call(getEditor, JSON.stringify(a));
      if (data) {
        let a={};
        a.type="3";
        a.data=data;
        yield put({
          type: 'getSuccess',
          payload: a,
        })
      }
    },
    *getJournal({ payload }, { call, put, select}) {
      yield put({ type: 'showLoading' });
      const app = yield select(state => state.app);
      const a={"publisher_id":app.user_id};
      const data = yield call(getJournal, JSON.stringify(a));
      if (data) {
        let a={};
        a.type="4";
        a.data=data;
        yield put({
          type: 'getSuccess',
          payload: a,
        })
      }
    },
    *getAllJournal({ payload }, { call, put, select}) {
      yield put({ type: 'showLoading' });
      const a={"publisher_id":"-1"};
      const data = yield call(getJournal, JSON.stringify(a));
      if (data) {
        let a={};
        a.type="4";
        a.data=data;
        yield put({
          type: 'getSuccess',
          payload: a,
        })
      }
    },
    *getAllField({ payload }, { call, put, select}) {
      yield put({ type: 'showLoading' });
      const data = yield call(getField, "");
      if (data) {
        let a={};
        a.type="5";
        a.data=data;
        yield put({
          type: 'getSuccess',
          payload: a,
        })
      }
    },
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
      yield put({ type: 'showLoading' });
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
    setUserid(state,action)
    {
      return { ...state, user_id: action.payload }
    },
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
    getSuccess(state, action) {
      console.log(action.payload.data);
      if(action.payload.type=="0")
        return { ...state, _examinepaperlist:action.payload.data, loading: false };
      else if(action.payload.type=="1")
        return { ...state, _examinepaperlist:action.payload.data, loading: false };
      else if(action.payload.type=="2")
        return { ...state, _authorlist:action.payload.data, loading: false };
      else if(action.payload.type=="3")
        return { ...state, _editorlist:action.payload.data, loading: false };
      else if(action.payload.type=="4")
        return { ...state, _journallist:action.payload.data, loading: false };
      else if(action.payload.type=="5")
        return { ...state, _fieldlist:action.payload.data, loading: false };
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    showeditModal(state, action) {
      return { ...state, edititem:action.payload, editmodalVisible: true }
    },
    hideModal(state) {
      return { ...state, modalVisible: false ,editmodalVisible: false}
    },
    setCurItem(state,action){
      return { ...state, currentItem: action.payload }
    },
    setDataBaseInfo(state,action){
      return { ...state, dashboard: action.payload }
    },
  },

}
