import {request} from './request'
import store from '@/store'

export function getWXResource() {
  return request({
    method: "post",
    url: store.state.API_SERVER_URL + "/getSatInfo"
  })
}