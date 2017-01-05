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
export async function getexaminePaper(params) {
  return request('getExaminePaper/', {
    method: 'post',
    data:params,
  })
}
export async function getmyPaper(params) {
  return request('getPaperList/', {
    method: 'post',
    data:params,
  })
}

export async function getAuthor(params) {
  return request('getAuthorList/', {
    method: 'post',
    data:params,
  })
}
export async function getEditor(params) {
  return request('getEditorList/', {
    method: 'post',
    data:params,
  })
}
export async function getJournal(params) {
  return request('getJournalList/', {
    method: 'post',
    data:params,
  })
}
export async function getField(params) {
  return request('getFieldList/', {
    method: 'post',
    data:params,
  })
}

export async function getUserList(params) {
  return request('getUserList/', {
    method: 'post',
    data:params,
  })
}

export async function addPaper(params) {
  return request('addPaper/', {
    method: 'post',
    data:params,
  })
}

export async function editPaper(params) {
  return request('editPaper/', {
    method: 'post',
    data:params,
  })
}

export async function delPaper(params) {
  return request('deletePaper/', {
    method: 'post',
    data:params,
  })
}

export async function setSalary(params) {
  return request('setSalary/', {
    method: 'post',
    data:params,
  })
}

export async function examinePaper(params) {
  return request('examinePaper/', {
    method: 'post',
    data:params,
  })
}

export async function getDataBaseInfo(params) {
  return request('getDataBaseInfo/', {
    method: 'post',
    data: params,
  })
}
