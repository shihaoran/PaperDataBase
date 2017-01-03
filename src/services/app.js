import { request } from '../utils'
import qs from 'qs'

export async function login(params) {
  return request('login/', {
    method: 'post',
    data:params,
  })
}

export async function logout(params) {
  return request('/api/logout', {
    method: 'post',
    data:params,
  })
}

export async function userInfo(params) {
  return request('/api/userInfo', {
    method: 'get',
    data:params,
  })
}

export async function registerUser(params) {
  console.log(params);
  return request('registerUser/', {
    method: 'post',
    data:params,
  })
}

export async function register(params) {
  console.log(params);
  return request('register/', {
    method: 'post',
    data:params,
  })
}

export async function get(params) {
  return request('register/', {
    method: 'get',
    data:params,
  })
}
