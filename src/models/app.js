import {login, userInfo, logout,registerUser,register,getOpt,getJournal} from '../services/app'
import {parse} from 'qs'
import { Button, notification } from 'antd';
import Cookie from 'js-cookie'

export default {
  namespace : 'app',
  state : {
    login: false,
    loading: false,
    user_name:"",
    user_type:"",
    user_id:"",
    user_journal_id:"",
    loginButtonLoading: false,
    siderFold:localStorage.getItem("antdAdminSiderFold")==="true"?true:false,
    darkTheme:localStorage.getItem("antdAdminDarkTheme")==="false"?false:true,
    isNavbar:document.body.clientWidth<769?true:false,
    regmodal_visible:false,
    reg_type:-1,
    Optlist:[],
    passwordDirty: false,

  },
  subscriptions : {
    setup({dispatch}) {
      //dispatch({type: 'queryUser'})
      window.onresize = function(){
        dispatch({type: 'changeNavbar'})
      }
    }
  },
  effects : {
    *login({
      payload
    }, {call, put}) {
      yield put({type: 'showLoginButtonLoading'});
      const data = yield call(login, JSON.stringify(payload));
      if(data.type=="0")
      {
        yield put({type: 'loginSuccess', payload:data });
      }
      else
      {
        yield put({type: 'loginFail', payload:data });
      }
    },
    *register({
      payload
    }, {call, put}) {
      yield put({type: 'showLoading'});
      yield put({type: 'hideRegModal'});
      let send=JSON.stringify(payload);
      let data={};
      if(payload.type=='0'||payload.type=='1'||payload.type=='2')
        data = yield call(registerUser, send);
      else
        data = yield call(register, send);
      console.log("dddd");
      console.log(data);
      if(data.type=="0")
      {
        yield put({type: 'loginSuccess', payload:data });
        notification['success']({
          message: '注册成功',
          description: '注册成功，您可以使用数据库了！',
        });
        if(payload.type=="2")
        {
          yield put({type: 'setuserjournalid', payload:payload.editor_journal_id});
        }
      }
      else if(data.type=="1")
      {
        yield put({type: 'hideLoading'});
        notification['warning']({
          message: "用户重名",
          description: '该用户名已经被注册啦！',
        });
      }
      else if(data.type=="1")
      {
        yield put({type: 'hideLoading'});
        notification['warning']({
          message: "用户重名",
          description: '该用户名已经被注册啦！',
        });
      }
      else if(data.type=="3")
      {
        yield put({type: 'hideLoading'});
        notification['warning']({
          message: "机构重名",
          description: '该机构已经被注册啦！',
        });
      }
      else
      {
        yield put({type: 'hideLoading'});
        notification['error']({
          message: '网络错误',
          description: '网络开小差啦，请等会重试！',
        });
      }

    },
    *fetchOption({
      payload
    }, {call, put,select}) {
      const app = yield select(state => state.app);
      let data=[];
      if(app.reg_type=="2")
        data = yield call(getJournal, {publisher_id:"-1"});
      else
        data = yield call(getOpt, payload);
      console.log(data);
      if (data) {
        yield put({type: 'setOptlist',payload:data});
      }
    },
    *queryUser({
      payload
    }, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(userInfo, parse(payload))
      if (data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: data.username
            }
          }
        })
      } else {
        yield put({type: 'hideLoading'})
      }
    },
    *logout({
      payload
    }, {call, put}) {
      yield put({
        type: 'logoutSuccess'
      })
    },
    *switchSider({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchSider'
      })
    },
    *changeTheme({
      payload
    }, {put}) {
      yield put({
        type: 'handleChangeTheme'
      })
    },
    *changeNavbar({
      payload
    }, {put}) {
      if(document.body.clientWidth<769){
        yield put({type: 'showNavbar'})
      }else {
        yield put({type: 'hideNavbar'})
      }
    },
  },
  reducers : {
    loginSuccess(state, action) {
      let j_id="-2";
      console.log(action.payload);
      if(action.payload.user_type=='2')
        j_id=action.payload.journal_id;
      return {
        ...state,
        user_name:action.payload.name,
        user_id:action.payload.id,
        user_type:action.payload.user_type,
        user_journal_id:j_id,
        login: true,
        loginButtonLoading: false
      }
    },
    logoutSuccess(state){
      return {
        ...state,
        login: false,
        loading:false,
      }
    },
    loginFail(state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false
      }
    },
    showLoginButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: true
      }
    },
    showLoading(state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading(state) {
      return {
        ...state,
        loading: false
      }
    },
    handleSwitchSider(state) {
      localStorage.setItem("antdAdminSiderFold",!state.darkTheme)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleChangeTheme(state) {
      localStorage.setItem("antdAdminDarkTheme",!state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme
      }
    },
    showNavbar(state) {
      return {
        ...state,
        isNavbar: true
      }
    },
    hideNavbar(state) {
      return {
        ...state,
        isNavbar: false
      }
    },
    showRegModal(state,action) {
      console.log(action.payload);
      return {
        ...state,
        regmodal_visible: true,
        reg_type:action.payload,
      }
    },
    hideRegModal(state) {
      return {
        ...state,
        regmodal_visible: false
      }
    },
    setOptlist(state,action) {
      return {
        ...state,
        Optlist: action.payload,
      }
    },
    setpasswordDirty(state,action){
      return {
        ...state,
        passwordDirty: action.payload,
      }
    },
    setuserjournalid(state,action){
      return {
        ...state,
        user_journal_id: action.payload,
      }
    }
  }
}
