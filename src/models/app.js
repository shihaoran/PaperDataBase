import {login, userInfo, logout,registerUser,register,getOpt} from '../services/app'
import {parse} from 'qs'
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
        yield put({type: 'loginSuccess', payload:data })
      }
      else if(data.type=="1")
      {
        yield put({type: 'hideLoading'});
      }
      else if(data.type=="3")
      {
        yield put({type: 'hideLoading'});
      }

    },
    *fetchOption({
      payload
    }, {call, put}) {
      const data = yield call(getOpt, payload)
      if (data) {
        let ddd=[];
        data.map((d,i)=>{
          let a={};
          if(payload.type === '1')
          {
            a.value=d.agency_id;
            a.key=d.agency_name;
          }
          else if(payload.type === '2')
          {
            a.value=d.journal_id;
            a.key=d.journal_name;
          }
          else if(payload.type === '4')
          {
            a.value=d.publisher_id;
            a.key=d.publisher_name;
          }
          ddd[i]=a;
        });
        console.log(JSON.stringify(ddd));
        yield put({type: 'setOptlist',payload:ddd});
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
      const data = yield call(logout, parse(payload))
      if(data.success){
        yield put({
          type: 'logoutSuccess'
        })
      }
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
      let j_id="-1";
      if(action.payload.type=='2')
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
        login: false
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
  }
}
