import { request } from '../utils'
import qs from 'qs'

export async function queryPaper(params) {
  return request('searchPaper/', {
    method: 'post',
    data:params,
  })
}
export async function queryAuthor(params) {
  return request('searchAuthor/', {
    method: 'post',
    data:params,
  })
}
export async function queryAgency(params) {
  return request('searchAgency/', {
    method: 'post',
    data:params,
  })
}
export async function queryJournal(params) {
  return request('searchJournal/', {
    method: 'post',
    data:params,
  })
}
export async function queryPublisher(params) {
  return request('searchPublisher/', {
    method: 'post',
    data:params,
  })
}

export async function create(params) {
  return request('/api/users', {
    method: 'post',
    data:params,
  })
}

export async function remove(params) {
  return request('/api/users', {
    method: 'delete',
    data:params,
  })
}

export async function update(params) {
  return request('/api/users', {
    method: 'put',
    data: params,
  })
}
